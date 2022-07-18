import React, { useState } from 'react'
import { useQueryClient } from 'react-query';
import { useMutation } from 'react-query';
import axios from 'axios';
import { TextInput } from 'react-native-paper';
import { StyledHeading1,
  StyledFormBackground,
  StyledFormTextInput,
  StyledFormButton,
  StyledFormButtonText, 
  StyledSettingsHeading2,
  StyledHealthStatHeading,
} from '../styles';
import { useUserData } from '../../hooks/useUserData';
import { API_URL } from '../../../secrets';


const ChangeGoal = ({navigation}) => {
  const queryClient = useQueryClient();
  const [dailyStepGoal, setDailyStepGoal] = useState('0');
  const { user } = useUserData();

  let token;
  if (user) {
    token = user.token;
  }

  const mutation = useMutation(
    async (dailyStepGoal) => {
      try {
        await axios.put(
          `http://${API_URL}/api/user`,
          { dailyStepGoal },
          {
            headers: { authorization: token },
          }
        );
        return navigation.navigate('DokiHome');
      } catch (error) {
        console.log({error})
      }
    },
  );

  const handleSubmit = async () => {
    mutation.mutate(dailyStepGoal, {
      onSuccess: () => {
        queryClient.invalidateQueries(['user'])
      },
    });
    this.textInput.clear()
    setDailyStepGoal('0')
  };


  return (
    <StyledFormBackground
      source={require('../../../assets/backgrounds/dokihome_background4.png')}
      resizeMode="cover"
    >
      <StyledHealthStatHeading style={{marginTop: 80, marginBottom: 200}}>Change Your Daily Step Goal</  StyledHealthStatHeading>

        <StyledFormTextInput
          placeholder="New Step Goal"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          onChangeText={setDailyStepGoal}
          style={{
            width: 240,
            fontFamily: dailyStepGoal ? 'FredokaOne' : 'Singularity',
            fontSize: dailyStepGoal ? 18 : 24,
          }}
          ref={input => { this.textInput = input }}
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
           navigation.navigate('User Settings')
          }}
        >
        <StyledFormButtonText>Cancel</StyledFormButtonText>
        </StyledFormButton>

    </StyledFormBackground>
  );
};

export default ChangeGoal

