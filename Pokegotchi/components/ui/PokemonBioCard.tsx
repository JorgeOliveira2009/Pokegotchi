import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const PokemonBioCard = () => (
  <Card style={styles.ctn}>
  
    <Card.Content>
        <Text>Pokemon</Text>
    </Card.Content>
   
  </Card>
);

export default  PokemonBioCard ;
const styles = StyleSheet.create({
    ctn: {
        width:300,
        height:400,
        borderRadius:20,
        backgroundColor:"red"
    }
})