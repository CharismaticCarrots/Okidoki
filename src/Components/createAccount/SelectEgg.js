import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { StyledDokiHomeBackground } from '../styles'


const SelectEgg = () => {
  return (
    <View>
      <StyledDokiHomeBackground source={require("../../../assets/selectEgg.png")} resizeMode="cover">
      <Text style={styles.text}>Select a Doki Egg</Text>
      <TextInput placeholder="Doki Name"  style={styles.input}/>
      </StyledDokiHomeBackground>
    </View>
  )
}

export default SelectEgg

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff"
  },
  text: {
    fontSize: 40
  }
})