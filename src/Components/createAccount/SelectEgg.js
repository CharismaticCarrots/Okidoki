import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { StyledDokiHomeBackground } from '../styles'
import Sprite from '../Sprite'
import {Animated} from 'react-native';
import { TouchableOpacity } from 'react-native-web';
import { Button } from 'react-native-paper';


const SelectEgg = () => {
  const [egg, setEgg] = useState(null)
  return (
    <View >
      <StyledDokiHomeBackground source={require("../../../assets/selectEgg.png")} resizeMode="cover">
      <View style={styles.container}>
      <Text style={styles.text}>Select a Doki Egg</Text>
      <TextInput placeholder="Doki Name"  style={styles.input}/>
      <View style={styles.eggs}>
      <Button
      onPress={() => setEgg('egg1')}
      >
      <Sprite
        src={require('../../../assets/greenEgg.png')}
        totalSprites={egg == 'egg1' ? 1 :2}
        tile={{ width: 600, height: 719 }}
        scale={0.1}
        framesPerSprite={29}
      />
      </Button>
      <Button
      onPress={() => setEgg('egg2')}
      >
      <Sprite
        src={require('../../../assets/greenEgg.png')}
        totalSprites={egg == 'egg2' ? 1 :2}
        tile={{ width: 600, height: 719 }}
        scale={0.1}
        framesPerSprite={29}
      />
      </Button>
      <Button
      onPress={() => setEgg('egg3')}
      >
      <Sprite
        src={require('../../../assets/greenEgg.png')}
        totalSprites={egg == 'egg3' ? 1 :2}
        tile={{ width: 600, height: 719 }}
        scale={0.1}
        framesPerSprite={29}
      />
      </Button>
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
  }
})