import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Animated, Easing } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import {
  StyledDokiHomeBackground,
  StyledInput,
  StyledHeader
} from '../styles';
import { useMutation } from 'react-query';
import { API_URL } from '../../../secrets.js';
import { useUserData } from '../../hooks/useUserData';
import axios from 'axios';

const SelectEgg = ({ navigation }) => {
  const [egg, setEgg] = useState('');
  const [dokiName, setDokiName] = useState(null);

  const user = useUserData();
  const token = user.token;

  const mutation = useMutation(
    (dokiName) => {
      return axios.post(
        `http://${API_URL}/api/user/doki`,
        { dokiName },
        { headers: { authorization: token } }
      );
    },
    {
      onSuccess: () => {
        navigation.navigate('DokiHome');
      },
    }
  );

  const handleSubmit = async () => {
    mutation.mutate(dokiName);
  };

  const spinValue = new Animated.Value(0);
  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['-10deg', '10deg'],
  });

  return (
    <View>
      <StyledDokiHomeBackground
        source={require('../../../assets/selectEgg.png')}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <StyledHeader>Select a Doki Egg</StyledHeader>
         
          <StyledInput 
            placeholder='Doki Name' 
            onChangeText={setDokiName}
            />
          <View style={styles.eggs}>
            <Animated.View
              style={egg === 'egg1' ? { transform: [{ rotate: spin }] } : {}}
            >
              <TouchableOpacity onPress={(e) => setEgg('egg1')}>
                <Image
                  style={styles.image}
                  source={require('../../../assets/egg.png')}
                />
              </TouchableOpacity>
            </Animated.View>
            <Animated.View
              style={egg === 'egg2' ? { transform: [{ rotate: spin }] } : {}}
            >
              <TouchableOpacity onPress={() => setEgg('egg2')}>
                <Image
                  style={styles.image}
                  source={require('../../../assets/egg.png')}
                />
              </TouchableOpacity>
            </Animated.View>
            <Animated.View
              style={egg === 'egg3' ? { transform: [{ rotate: spin }] } : {}}
            >
              <TouchableOpacity onPress={() => setEgg('egg3')}>
                <Image
                  style={styles.image}
                  source={require('../../../assets/egg.png')}
                />
              </TouchableOpacity>
            </Animated.View>
          </View>
          <Button
            mode="contained"
            onPress={() => {
              handleSubmit();
            }}
          >
            SUBMIT
          </Button>
        </View>
      </StyledDokiHomeBackground>
    </View>
  );
};

export default SelectEgg;

const styles = StyleSheet.create({
  eggs: {
    flex: 0.35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 140,
  },
  container: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  image: {
    height: 120,
    width: 100,
  },
});
