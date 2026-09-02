import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PaginaStart from './pages/PaginaStart';
// quando criar a próxima tela, importa ela aqui e adiciona um Stack.Screen

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="PaginaStart" component={PaginaStart} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
