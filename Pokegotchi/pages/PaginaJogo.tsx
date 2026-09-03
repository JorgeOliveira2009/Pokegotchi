import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'
import pokemonLogo from "../assets/pokemon-logo-png_seeklogo-284734-removebg-preview.png"
import { SafeAreaView } from 'react-native-safe-area-context'
import PokedexCard from '../components/ui/PokedexCard'
const PaginaJogo = () => {
  return (
    <SafeAreaView style={styles.ctn}>
      <View style={styles.header}>
            <View style={{width:"60%"}}>
            <Image  source={pokemonLogo} style={{height:"100%", width:"100%"}}/>
            </View>
      </View>
      <ScrollView>
        <View style={{padding:20, justifyContent:"center", alignItems:"center"}}>
            <PokedexCard/>

        </View>

        

      </ScrollView>
    </SafeAreaView>
  )
}

export default PaginaJogo

const styles = StyleSheet.create({
    header: {
        backgroundColor:"red",
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center",
        height:150,
        borderBottomEndRadius:20,
        borderBottomLeftRadius:20
    },
    ctn:{
        justifyContent:"center",
        
    }
})