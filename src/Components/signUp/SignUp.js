import React, { useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
import { useCreateUser } from '../../hooks/useUsersData';
import { StyledContainer, StyledHeading1 } from '../styles';

const SignUp = ({ navigation }) => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const { mutate } = useCreateUser();

  const handleSubmit = () => {
    mutate(userData);
    navigation.navigate('SetGoal');
  };

  return (
    <StyledContainer>
      <StyledHeading1>Create Account</StyledHeading1>
      <TextInput
        label="First Name"
        value={userData.firstName}
        mode="outlined"
        onChangeText={(e) =>
          setUserData((prevState) => ({ ...prevState, firstName: e }))
        }
      />
      <TextInput
        label="Last Name"
        value={userData.lastName}
        mode="outlined"
        onChangeText={(e) =>
          setUserData((prevState) => ({ ...prevState, lastName: e }))
        }
      />
      <TextInput
        label="Email"
        value={userData.email}
        mode="outlined"
        onChangeText={(e) =>
          setUserData((prevState) => ({ ...prevState, email: e }))
        }
      />
      <TextInput
        label="Password"
        secureTextEntry={true}
        mode="outlined"
        onChangeText={(e) =>
          setUserData((prevState) => ({ ...prevState, password: e }))
        }
      />

      <Button
        mode="contained"
        onPress={() => {
          handleSubmit();
        }}
      >
        Sign Up
      </Button>
    </StyledContainer>
  );
};

export default SignUp;
