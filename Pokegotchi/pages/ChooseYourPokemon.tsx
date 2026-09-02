import { StyleSheet, Text, View, Image, ScrollView} from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import PokemonCard from '../components/ui/PokemonCard'
const ChooseYourPokemon = () => {
  return (
    <View>
      <SafeAreaView>
            <View>
                <Image/>
                <Text>Pokegotchi</Text>
                <Text>Escolha seu pokemon!</Text>
            </View>
            <View>
                <View>
                    <Text>Professor Oak</Text>
                    <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, deserunt?</Text>
                </View>
                <View>
                    <PokemonCard pokemonImage={''} pokemonName={'Gengar'} pokemonBio={'loremsdbsbfjsbdfjsbdfbsjdfb shdbfhsf hsdfbjshdfb hsbdfhsbdfsdfioiiisdfnsdf'} />
                </View>
            </View>
      </SafeAreaView>
    </View>
  )
}

export default ChooseYourPokemon

const styles = StyleSheet.create({})