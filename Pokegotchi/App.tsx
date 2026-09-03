// Importamos o React para criar o aplicativo.
import React from 'react'

// NavigationContainer é responsável por controlar
// a navegação entre as telas.
import { NavigationContainer } from '@react-navigation/native'

// Cria um navegador no formato de pilha (Stack).
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Importamos as telas do aplicativo.
import PaginaStart from './pages/PaginaStart'
import ChooseYourPokemon from './pages/ChooseYourPokemon'


// Criamos o Stack que vai armazenar
// as telas disponíveis para navegação.
const Stack = createNativeStackNavigator()


// Componente principal do aplicativo.
export default function App() {

  return (

    // O NavigationContainer envolve todas as telas
    // e permite que uma tela navegue para outra.
    <NavigationContainer>

      {/* Stack.Navigator organiza as telas
          dentro da navegação.

          headerShown: false remove o cabeçalho
          padrão que o React Navigation coloca nas telas. */}
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
      >

        {/* Primeira tela exibida quando o aplicativo inicia. */}
        <Stack.Screen
          name="PaginaStart"
          component={PaginaStart}
        />

        {/* Tela de escolha do Pokémon inicial.
            Ela é acessada através do botão START
            da tela PaginaStart. */}
        <Stack.Screen
          name="ChooseYourPokemon"
          component={ChooseYourPokemon}
        />

      </Stack.Navigator>

    </NavigationContainer>
  )
}