import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import {Animated, Easing} from 'react-native';

const DokiEgg = () => {
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

  const back = this.spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['30deg', '-30deg']
  })
  return (
    <Animated.View style={ {transform: [{rotate: spin}] } } >
      <Image
       style={styles.image} source={require('../../../assets/egg.png')} />
       </Animated.View>
  )
}

export default DokiEgg

const styles = StyleSheet.create({
  image: {
    height: 120,
    width: 100
  }
})
