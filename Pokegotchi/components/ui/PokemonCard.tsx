import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

type pokeCardProp = {
    pokemonImage: string;
    pokemonName: string;
    pokemonBio: string;
}

export default function PokemonCard({pokemonImage, pokemonName, pokemonBio}: pokeCardProp) {
  return (
    <View>
      <View>
        <Image source={pokemonImage} width={100} height={100}/>
      </View>
      <View>
        <Text>{pokemonName}</Text>
        <Text>{pokemonBio}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})