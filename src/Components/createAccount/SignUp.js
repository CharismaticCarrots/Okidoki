import React, { useState } from 'react';
import { StyledContainer, StyledHeading1 } from '../styles';
import { TextInput, Button } from 'react-native-paper';
import { useCreateUser } from '../../hooks/useUsersData';

const SignUp = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const { mutate: createUser } = useCreateUser();

  const handleSubmit = async () => {
    // console.log(userData);
    createUser(userData);
  };

  return (
    <StyledContainer>
      <StyledHeading1>Sign Up</StyledHeading1>
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
