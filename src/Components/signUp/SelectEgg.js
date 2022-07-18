import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Animated, Easing } from 'react-native';
import {
  StyledDokiHomeBackground,
  StyledHeading1,
  StyledFormTextInput,
  StyledFormButton,
  StyledFormButtonText,
} from '../styles';
import { useMutation } from 'react-query';
import { API_URL } from '../../../secrets.js';
import { useUserData } from '../../hooks/useUserData';
import axios from 'axios';

const SelectEgg = ({ navigation }) => {
  const [egg, setEgg] = useState('');
  const [dokiName, setDokiName] = useState(null);

  const { user } = useUserData();
  let token;
  if (user) {
    token = user.token;
  }

  const mutation = useMutation(
    async (dokiName) => {
      try {
        await axios.post(
          `http://${API_URL}/api/user/doki`,
          {
            dokiName: dokiName,
              eggColor: egg
            },
          { headers: { authorization: token } }
        );
        return navigation.navigate('DokiHome');
      } catch (error) {
        console.log({error})
      }
    },
  );


  const handleSubmit = async () => {
    mutation.mutate(dokiName);
  };

  const spinValue = new Animated.Value(0);
  Animated.loop(
    Animated.sequence([
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(spinValue, {
        toValue: 0,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ])
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['-3deg', '3deg'],
  });

  return (
    <StyledDokiHomeBackground
      source={require('../../../assets/backgrounds/loginOptions.png')}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <StyledHeading1
          style={{marginTop: 150}}
        >Select a Doki</StyledHeading1>

        <View style={styles.eggSelection}>
          <View style={styles.eggRow}>
            <Animated.View
              style={egg === 'red' ? { transform: [{ rotate: spin }] } : {}}
            >
              <TouchableOpacity onPress={(e) => setEgg('red')}>
                <Image
                  style={styles.eggImg}
                  source={require('../../../assets/eggs/egg1.png')}
                />
              </TouchableOpacity>
            </Animated.View>
            <Animated.View
              style={egg === 'green' ? { transform: [{ rotate: spin }] } : {}}
            >
              <TouchableOpacity onPress={() => setEgg('green')}>
                <Image
                  style={styles.eggImg}
                  source={require('../../../assets/eggs/egg2.png')}
                />
              </TouchableOpacity>
            </Animated.View>
            <Animated.View
              style={egg === 'blue' ? { transform: [{ rotate: spin }] } : {}}
            >
              <TouchableOpacity onPress={() => setEgg('blue')}>
                <Image
                  style={styles.eggImg}
                  source={require('../../../assets/eggs/egg3.png')}
                />
              </TouchableOpacity>
            </Animated.View>
          </View>
          <View style={styles.form}>
            <StyledFormTextInput
              placeholder="Name your Doki"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
              onChangeText={setDokiName}
              style={{
                fontFamily: dokiName ? 'FredokaOne' : 'Singularity',
                fontSize: dokiName ? 18 : 24,
                width: 250,
                marginTop: 30,
              }}
            />

            <StyledFormButton
              onPress={() => {
                handleSubmit();
              }}
              style={{
                marginTop: 5,
                width: 150,
                backgroundColor: '#59b2ff',
              }}
            >
              <StyledFormButtonText>Submit</StyledFormButtonText>
            </StyledFormButton>
          </View>
        </View>
      </View>
    </StyledDokiHomeBackground>
  );
};

export default SelectEgg;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  eggSelection: {
    height: 450,
  },
  eggRow: {
    flexDirection: 'row',
    marginBottom: 50,
  },
  eggImg: {
    height: 125,
    width: 105,
  },
  form: {
    alignItems: 'center',
  },
});
