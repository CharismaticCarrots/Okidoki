import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { StyledDokiHomeBackground } from '../styles'
import {Animated, Easing} from 'react-native';
import { Button } from 'react-native-paper';
import { TextInput } from 'react-native-paper';

const SelectEgg = () => {
  const [egg, setEgg] = useState(null)
  spinValue = new Animated.Value(0);

  Animated.loop(
  Animated.timing(
      this.spinValue,
    {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear, 
      useNativeDriver: true  
    }
  )).start()

  const spin = this.spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['-20deg', '20deg']
  })

  return (
    <View >
      <StyledDokiHomeBackground source={require("../../../assets/selectEgg.png")} resizeMode="cover">
      <View style={styles.container}>
      <Text style={styles.text}>Select a Doki Egg</Text>
      <TextInput placeholder="Doki Name"  style={styles.input}/>
      <View style={styles.eggs}>
      <Animated.View style={egg === 'egg1' ? {transform: [{rotate: spin}]} : {} } >
      <TouchableOpacity onPress={() => setEgg("egg1")}> 
        <Image
         style={styles.image} source={require('../../../assets/egg.png')} />
       </TouchableOpacity>
         </Animated.View>
         <Animated.View style={egg === 'egg2'  ? {transform: [{rotate: spin}] } : {} } >
      <TouchableOpacity onPress={() => setEgg("egg2")}> 
        <Image
         style={styles.image} source={require('../../../assets/egg.png')} />
       </TouchableOpacity>
         </Animated.View>
         <Animated.View style={egg === 'egg3'  ? {transform: [{rotate: spin}] } : {} } >
      <TouchableOpacity onPress={() => setEgg("egg3")}> 
        <Image
         style={styles.image} source={require('../../../assets/egg.png')} />
       </TouchableOpacity>
         </Animated.View>
      </View>
      <Button mode='contained'>
        SUBMIT
      </Button>
      </View>
      </StyledDokiHomeBackground>
    </View>
  )
}

export default SelectEgg

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    height: 40,
    width: 200
  },
  text: {
    fontSize: 40
  },
  eggs: {
    flex: 0.35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 140
  },
  container: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  image: {
    height: 120,
    width: 100
  }
})