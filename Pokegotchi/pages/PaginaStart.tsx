import React, { useState, useEffect } from 'react';

import { View, Text, Pressable, StyleSheet, Animated } from 'react-native';

export default function TitleScreen({ navigation }) {

  // true/false que fica alternando pra fazer o texto piscar
  const [visivel, setVisivel] = useState(true);

  // animação de escala pro botão start "afundar" quando apertar
  const escala = new Animated.Value(1);

  // toda vez que monta a tela, começa o pisca-pisca
  useEffect(() => {

    const timer = setInterval(() => setVisivel(v => !v), 600);

    return () => clearInterval(timer); // para o timer quando sair da tela

  }, []);

  function apertouStart() {

    // anima o botão antes de navegar
    Animated.sequence([

      Animated.timing(escala, {
        toValue: 0.85,
        duration: 80,
        useNativeDriver: true
      }),

      Animated.timing(escala, {
        toValue: 1,
        duration: 80,
        useNativeDriver: true
      }),

    ]).start(() => navigation.navigate('ChooseYourPokemon')); // vai para a tela de escolher o Pokémon
  }

  return (

    <View style={s.tela}>

      {/* título com letras coloridas igual ao logo do GBC */}
      <Text style={s.titulo}>

        Poké

        <Text style={{ color: '#4CAF50' }}>G</Text>
        <Text style={{ color: '#F44336' }}>o</Text>
        <Text style={{ color: '#FFD700' }}>t</Text>
        <Text style={{ color: '#4CAF50' }}>c</Text>
        <Text style={{ color: '#2196F3' }}>h</Text>
        <Text style={{ color: '#F44336' }}>i</Text>

      </Text>


      {/* Animated.View envolve o botão pra animação de scale funcionar */}
      <Animated.View style={{ transform: [{ scale: escala }] }}>

        <Pressable style={s.botao} onPress={apertouStart}>

          <Text style={s.botaoTexto}>START</Text>

        </Pressable>

      </Animated.View>

      {/* pisca: some e aparece dependendo do estado visivel */}
      {visivel && <Text style={s.pisca}>aperte START</Text>}

    </View>
  );
}

const s = StyleSheet.create({

  tela: {
    flex: 1,
    backgroundColor: '#5B2D8E',
    alignItems: 'center',
    justifyContent: 'center',
  },

  titulo: {
    fontSize: 48,
    fontWeight: '900',
    color: '#fff',
  },

  pisca: {
    position: 'absolute',
    bottom: 40,
    color: '#fff',
    fontSize: 16,
  },

  botao: {
    backgroundColor: '#1C1C1C',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },

  botaoTexto: {
    color: '#aaa',
    fontWeight: '700',
    letterSpacing: 2,
  },

});