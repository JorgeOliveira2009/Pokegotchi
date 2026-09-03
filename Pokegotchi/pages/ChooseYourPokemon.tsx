import {StyleSheet, View, ScrollView, ActivityIndicator,} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState, useEffect } from 'react'
import {Text, Surface,} from 'react-native-paper'
import PokemonCard from '../components/ui/PokemonCard'

interface Pokemon {
  id: number
  name: string
  image: string
  types: string
}

// Tela onde o jogador escolhe seu Pokémon inicial.
const ChooseYourPokemon = ({ navigation }: any) => {

  // Estado que armazenará os Pokémon
  // recebidos da PokéAPI.
  const [pokemons, setPokemons] = useState<Pokemon[]>([])

  // Estado utilizado para controlar
  // o indicador de carregamento.
  const [carregando, setCarregando] = useState(true)

  // Estado utilizado caso aconteça
  // algum erro ao consumir a API.
  const [erro, setErro] = useState(false)

  // useEffect executa o consumo da API
  // quando a tela é carregada.
  useEffect(() => {

    // Função responsável por buscar
    // os Pokémon na PokéAPI.
    const buscarPokemons = async () => {

      try {

        // Lista dos três Pokémon iniciais
        // que queremos buscar na API.
        const nomes = [
          'bulbasaur',
          'charmander',
          'squirtle'
        ]

        // Fazemos uma requisição para cada Pokémon.
        // Promise.all espera todas as requisições
        // terminarem antes de continuar.
        const respostas = await Promise.all(

          nomes.map(async (nome) => {

            // Consumo da PokéAPI utilizando fetch.
            // A URL é montada juntando o endereço
            // da API com o nome do Pokémon.
            const resposta = await fetch(
              'https://pokeapi.co/api/v2/pokemon/' + nome
            )

            // Verificamos se a API respondeu corretamente.
            if (!resposta.ok) {
              throw new Error('Erro ao buscar Pokémon')
            }

            // Transformamos a resposta da API em JSON.
            const dados = await resposta.json()

            // Retornamos os dados daquele Pokémon.
            return dados
          })
        )

        // Transformamos os dados recebidos da API
        // no formato que nosso PokemonCard precisa.
        const pokemonsFormatados: Pokemon[] = respostas.map(
          (pokemon) => {

            // A PokéAPI retorna vários tipos.
            // Aqui pegamos os nomes dos tipos e juntamos.
            const tipos = pokemon.types
              .map((tipo: any) => tipo.type.name)
              .join(' / ')

            return {

              // Número da Pokédex.
              id: pokemon.id,

              // Nome do Pokémon.
              name: pokemon.name,

              // Pegamos a imagem oficial
              // disponibilizada pela PokéAPI.
              image:
                pokemon.sprites.other[
                  'official-artwork'
                ].front_default,

              // Tipos do Pokémon.
              types: tipos,
            }
          }
        )

        // Salvamos os Pokémon no estado.
        setPokemons(pokemonsFormatados)

      } catch (error) {

        // Caso aconteça algum problema com a API,
        // mostramos uma mensagem de erro.
        console.log(
          'Erro ao buscar Pokémon:',
          error
        )

        setErro(true)

      } finally {

        // Depois que a requisição terminar,
        // escondemos o carregamento.
        setCarregando(false)
      }
    }

    // Executamos a função responsável
    // por buscar os Pokémon.
    buscarPokemons()

  }, [])

  // Função executada quando o jogador
  // escolhe um Pokémon.
  function escolherPokemon(pokemon: Pokemon) {

    // Enviamos o jogador para a tela do jogo.
    // O nome do Pokémon escolhido é enviado
    // como parâmetro para a próxima tela.
    navigation.navigate('Jogo', {
      pokemon: pokemon.name,
    })
  }

  return (

    // SafeAreaView ocupa somente a área segura da tela.
    <SafeAreaView style={styles.safeArea}>

      {/*
        ScrollView permite rolar a tela caso os
        cards não caibam completamente na tela.
      */}
      <ScrollView
        contentContainerStyle={styles.container}
      >

        {/*
          =========================
          CABEÇALHO
          =========================
        */}

        <View style={styles.header}>

          {/* Título principal do aplicativo. */}
          <Text
            variant="displaySmall"
            style={styles.titulo}
          >
            Pokégotchi
          </Text>

          {/* Instrução para o jogador. */}
          <Text
            variant="titleMedium"
            style={styles.subtitulo}
          >
            Escolha seu Pokémon!
          </Text>

        </View>

        {/*
          =========================
          PROFESSOR OAK
          =========================
        */}

        {/* Caixa de diálogo do Professor Oak. */}
        <Surface
          style={styles.professor}
          elevation={3}
        >

          <Text
            variant="titleMedium"
            style={styles.professorNome}
          >
            Professor Oak
          </Text>

          <Text
            variant="bodyMedium"
            style={styles.professorTexto}
          >
            Olá, treinador! Escolha um Pokémon para
            começar sua aventura!
          </Text>

        </Surface>

        {/*
          =========================
          CARREGAMENTO
          =========================
        */}

        {carregando && (

          // Enquanto a PokéAPI não responder,
          // mostramos um indicador de carregamento.
          <View style={styles.carregando}>

            <ActivityIndicator size="large" />

            <Text
              variant="bodyMedium"
              style={styles.textoCarregando}
            >
              Buscando Pokémon...
            </Text>

          </View>
        )}

        {/*
          =========================
          ERRO
          =========================
        */}

        {erro && (

          <Text
            variant="bodyLarge"
            style={styles.erro}
          >
            Não foi possível carregar os Pokémon.
          </Text>

        )}

        {/*
          =========================
          POKÉMON INICIAIS
          =========================
        */}

        {!carregando && !erro && (

          /*
            Área que contém os três Pokémon
            recebidos da PokéAPI.
          */
          <View style={styles.pokemonContainer}>

            {pokemons.map((pokemon) => (

              // Cada Pokémon recebido da API
              // gera automaticamente um PokemonCard.
              <PokemonCard

                // O id é utilizado como chave
                // para diferenciar cada card.
                key={pokemon.id}

                // Número da Pokédex recebido da PokéAPI.
                pokemonId={pokemon.id}

                // Imagem oficial obtida diretamente
                // da resposta da PokéAPI.
                pokemonImage={pokemon.image}

                // Nome obtido da PokéAPI.
                // Transformamos a primeira letra
                // em maiúscula para mostrar na tela.
                pokemonName={
                  pokemon.name.charAt(0).toUpperCase() +
                  pokemon.name.slice(1)
                }

                // Tipo obtido da PokéAPI.
                pokemonBio={
                  'Tipo: ' + pokemon.types
                }

                // Quando o jogador tocar no card,
                // chamamos a função escolherPokemon.
                onPress={() => escolherPokemon(pokemon)}

              />

            ))}

          </View>
        )}

      </ScrollView>

    </SafeAreaView>
  )
}

// Exportamos a tela para que ela possa ser
// utilizada pelo sistema de navegação.
export default ChooseYourPokemon

// =========================
// ESTILOS DA TELA
// =========================

// StyleSheet.create organiza os estilos
// utilizados pelos componentes da tela.
const styles = StyleSheet.create({

  // Tela inteira.
  safeArea: {
    flex: 1,

    // Mantém a mesma ideia de cor da tela inicial.
    backgroundColor: '#5B2D8E',
  },

  // Container principal.
  container: {
    padding: 20,
  },

  // Área do título.
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 25,
  },

  // Título "Pokégotchi".
  titulo: {
    color: '#fff',
    fontWeight: '900',
  },

  // Texto abaixo do título.
  subtitulo: {
    color: '#ddd',
    marginTop: 8,
  },

  // Caixa onde fica a fala do Professor Oak.
  professor: {
    width: '100%',
    backgroundColor: '#1C1C1C',

    // Cantos arredondados.
    borderRadius: 8,

    // Espaçamento interno.
    padding: 18,

    // Espaço antes dos Pokémon.
    marginBottom: 20,
  },

  // Nome do Professor Oak.
  professorNome: {
    color: '#FFD700',
    fontWeight: '900',
    marginBottom: 8,
  },

  // Texto da mensagem do Professor.
  professorTexto: {
    color: '#fff',

    // Deixa o texto mais fácil de ler.
    lineHeight: 21,
  },

  // Área que agrupa os PokemonCard.
  pokemonContainer: {
    width: '100%',
  },

  // Área exibida enquanto a API está carregando.
  carregando: {
    alignItems: 'center',
    marginTop: 30,
  },

  // Texto exibido durante o carregamento.
  textoCarregando: {
    color: '#fff',
    marginTop: 10,
  },

  // Mensagem exibida quando ocorre um erro.
  erro: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 30,
  },

})