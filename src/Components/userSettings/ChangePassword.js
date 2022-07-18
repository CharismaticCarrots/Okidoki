import { useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import {
  StyledFormBackground,
  StyledFormTextInput,
  StyledFormButton,
  StyledFormButtonText,
  StyledHealthStatHeading,
} from '../styles';
import { useUserData } from '../../hooks/useUserData';
import { API_URL } from '../../../secrets';

const ChangePassword = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const { user } = useUserData();
  let token;
  if (user) {
    token = user.token;
  }

  const mutation = useMutation(async (password) => {
    try {
      await axios.put(
        `http://${API_URL}/api/user`,
        { password },
        {
          headers: { authorization: token },
        }
      );
      return navigation.navigate('User Settings');
    } catch (error) {
      console.log({ error });
    }
  });

  const handleSubmit = async () => {
    mutation.mutate(password);
    this.textInput.clear();
    setPassword('');
  };

  return (
    <StyledFormBackground
      source={require('../../../assets/backgrounds/dokihome_background4.png')}
      resizeMode="cover"
    >
      <StyledHealthStatHeading style={{ marginTop: 80, marginBottom: 200 }}>
        Change Your Password
      </StyledHealthStatHeading>
      <StyledFormTextInput
        placeholder="New Password"
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="off"
        onChangeText={setPassword}
        style={{ width: 240 }}
        ref={(input) => {
          this.textInput = input;
        }}
        clearButtonMode="always"
      />

      <StyledFormButton
        onPress={() => {
          handleSubmit();
        }}
        style={{ marginTop: 20, width: 150 }}
      >
        <StyledFormButtonText>Submit</StyledFormButtonText>
      </StyledFormButton>
      <StyledFormButton
        style={{ marginTop: 20, width: 150 }}
        onPress={() => {
          navigation.navigate('User Settings');
        }}
      >
        <StyledFormButtonText>Cancel</StyledFormButtonText>
      </StyledFormButton>
    </StyledFormBackground>
  );
};

export default ChangePassword;
