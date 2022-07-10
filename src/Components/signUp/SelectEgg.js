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

  const user = useUserData();
  let token;
  if (user) {
    token = user.token;
  }
  console.log('User on SelectEgg: ', user);

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
    <View>
      <StyledDokiHomeBackground
        source={require('../../../assets/backgrounds/loginOptions.png')}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <StyledHeading1>Select a Doki</StyledHeading1>

          <View style={styles.eggSelection}>
            <View style={styles.eggRow}>
              <Animated.View
                style={egg === 'egg1' ? { transform: [{ rotate: spin }] } : {}}
              >
                <TouchableOpacity onPress={(e) => setEgg('egg1')}>
                  <Image
                    style={styles.eggImg}
                    source={require('../../../assets/eggs/egg1.png')}
                  />
                </TouchableOpacity>
              </Animated.View>
              <Animated.View
                style={egg === 'egg2' ? { transform: [{ rotate: spin }] } : {}}
              >
                <TouchableOpacity onPress={() => setEgg('egg2')}>
                  <Image
                    style={styles.eggImg}
                    source={require('../../../assets/eggs/egg2.png')}
                  />
                </TouchableOpacity>
              </Animated.View>
              <Animated.View
                style={egg === 'egg3' ? { transform: [{ rotate: spin }] } : {}}
              >
                <TouchableOpacity onPress={() => setEgg('egg3')}>
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
                style={{ minWidth: '100%' }}
              />

              <StyledFormButton
                style={{
                  marginTop: 5,
                  marginBottom: 10,
                  width: 160,
                }}
                onPress={() => {
                  handleSubmit();
                }}
              >
                <StyledFormButtonText>Submit</StyledFormButtonText>
              </StyledFormButton>
            </View>
          </View>
        </View>
      </StyledDokiHomeBackground>
    </View>
  );
};

export default SelectEgg;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  eggSelection: {
    alignItems: 'center',
  },
  eggRow: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  eggImg: {
    height: 125,
    width: 105,
  },
  form: {
    alignItems: 'center',
    width: '60%',
    minWidth: 180,
  },
});
