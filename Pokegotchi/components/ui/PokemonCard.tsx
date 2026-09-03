// Importamos os componentes básicos do React Native
// que serão utilizados para montar o card.
import {
  StyleSheet,
  View,
  Image,
  Pressable,
} from 'react-native'

// Importamos o React.
import React from 'react'

// Componentes visuais do React Native Paper.
import {
  Card,
  Text,
  Button,
} from 'react-native-paper'

// Propriedades que o PokemonCard recebe.
type pokeCardProp = {

  // Imagem do Pokémon recebida da PokéAPI.
  pokemonImage: string;

  // Nome do Pokémon recebido da PokéAPI.
  pokemonName: string;

  // Tipo do Pokémon recebido da PokéAPI.
  pokemonBio: string;

  // Número da Pokédex recebido da PokéAPI.
  pokemonId: number;

  // Função executada quando o jogador
  // escolher o Pokémon.
  onPress: () => void;
}

// Componente responsável por mostrar
// as informações de um Pokémon.
export default function PokemonCard({
  pokemonImage,
  pokemonName,
  pokemonBio,
  pokemonId,
  onPress
}: pokeCardProp) {

  return (

    // Pressable permite que o card seja clicável.
    <Pressable onPress={onPress}>

      {/* Card do React Native Paper. */}
      <Card style={styles.card}>

        {/* Área onde fica a imagem do Pokémon. */}
        <View style={styles.imagemContainer}>

          {/*
            A imagem vem diretamente da PokéAPI.
            Como é uma URL, utilizamos uri.
          */}
          <Image
            source={{ uri: pokemonImage }}
            style={styles.imagem}
          />

        </View>

        {/* Conteúdo do card utilizando React Native Paper. */}
        <Card.Content>

          {/* Número da Pokédex. */}
          <Text variant="labelMedium">
            #{pokemonId.toString().padStart(3, '0')}
          </Text>

          {/* Nome do Pokémon. */}
          <Text
            variant="headlineSmall"
            style={styles.nome}
          >
            {pokemonName}
          </Text>

          {/* Tipo do Pokémon. */}
          <Text
            variant="bodyMedium"
            style={styles.tipo}
          >
            {pokemonBio}
          </Text>

        </Card.Content>

        {/* Botão do React Native Paper. */}
        <Card.Actions>

          <Button
            mode="contained"
            onPress={onPress}
          >
            Escolher
          </Button>

        </Card.Actions>

      </Card>

    </Pressable>
  )
}

// Estilos que ainda são necessários
// para posicionar a imagem e ajustar detalhes.
const styles = StyleSheet.create({

  // Card inteiro.
  card: {
    marginBottom: 15,
  },

  // Área da imagem.
  imagemContainer: {
    alignItems: 'center',
    padding: 10,
  },

  // Imagem do Pokémon.
  imagem: {
    width: 150,
    height: 150,
  },

  // Nome do Pokémon.
  nome: {
    fontWeight: 'bold',
  },

  // Tipo do Pokémon.
  tipo: {
    marginTop: 5,
  },

})