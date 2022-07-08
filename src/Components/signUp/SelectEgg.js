import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { StyledDokiHomeBackground } from '../styles'
import {Animated, Easing} from 'react-native';
import { Button } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { StyledInput, StyledHeading1 } from '../styles';

const SelectEgg = ({navigation}) => {
  const [egg, setEgg] = useState(null)
  const spinValue = new Animated.Value(0);
 

  Animated.loop(
  Animated.timing(
      spinValue,
    {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear, 
      useNativeDriver: true  
    }
  )).start()

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['-10deg', '10deg']
  })

  const handleSubmit = async () => {
    navigation.navigate('DokiHome');
  };


  return (
    <View >
      <StyledDokiHomeBackground source={require("../../../assets/selectEgg.png")} resizeMode="cover">
        <View style={styles.container}>
          <StyledHeading1>Select a Doki Egg</StyledHeading1>
         
          <StyledInput placeholder='Doki Name' style={backgroundColor = "#fff"}/>
          <View style={styles.eggs}>
            <Animated.View style={egg === 'egg1' ? {transform: [{rotate: spin}]} : {} } >
                <TouchableOpacity onPress={() => setEgg("egg1")}> 
                  <Image
                    style={styles.image} 
                    source={require('../../../assets/egg.png')} 
                    />
                </TouchableOpacity>
              </Animated.View>
              <Animated.View style={egg === 'egg2'  ? {transform: [{rotate: spin}] } : {} } >
                <TouchableOpacity onPress={() => setEgg("egg2")}> 
                  <Image
                    style={styles.image} 
                    source={require('../../../assets/egg.png')} 
                    />
                </TouchableOpacity>
              </Animated.View>
              <Animated.View style={egg === 'egg3'  ? {transform: [{rotate: spin}] } : {} } >
                <TouchableOpacity onPress={() => setEgg("egg3")}> 
                  <Image
                    style={styles.image} 
                    source={require('../../../assets/egg.png')} 
                    />
                </TouchableOpacity>
              </Animated.View>
          </View>
          <Button 
          mode='contained'
          onPress={() => {
            handleSubmit();
          }}
          >
            SUBMIT
          </Button>
        </View>
      </StyledDokiHomeBackground>
    </View>
  )
}

export default SelectEgg

const styles = StyleSheet.create({
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