// Index of Styled Components
import styled from 'styled-components';
import {
  View,
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { ProgressBar, TextInput as RNP_TextInput } from 'react-native-paper';

// Color Palette
const colors = {
  primary: '#ffefb4',
  secondary: '#59b2ff',
  tertiary: '#C7CDAB',
  text: {
    dark: '#333',
  },
};

// General Styles
const StyledLogoHeading = styled(Text)`
  font-size: 70px;
  font-weight: 500;
  text-align: center;
  color: ${colors.primary};
  font-family: 'singularity';
  letter-spacing: 2px;
`;

const StyledHeading1 = styled(Text)`
  font-size: 30px;
  color: ${colors.primary};
  font-weight: 500;
  text-align: center;
  margin-bottom: 20px;
  font-family: 'antipasto-bold';
  letter-spacing: 1px;
`;

const StyledHeading2 = styled(Text)`
  font-size: 20px;
  color: ${colors.text.dark};
  font-weight: 500;
  text-align: center;
  margin-bottom: 10px;
  font-family: 'antipasto';
`;

const StyledContainer = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 30px;
`;

// Forms — SignIn, SignUp, SetGoal
const StyledFormBackground = styled(ImageBackground)`
  display: flex;
  align-items: center;
`;

const StyledFormContainer = styled(View)`
  max-width: 70%;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const StyledFormTextInput = styled(TextInput)`
  width: 100%;
  background-color: white;
  border-radius: 50px;
  padding: 15px;
  font-size: 22px;
  margin-bottom: 4px;
  font-family: 'singularity';
  color: ${colors.text.dark};
`;

const StyledFormButton = styled(TouchableOpacity)`
  background-color: ${colors.primary};
  padding: 15px;
  border-radius: 50px;
  width: 220px;
  align-items: center;
`;

const StyledFormButtonText = styled(Text)`
  font-family: 'singularity';
  font-size: 22px;
  color: ${colors.secondary};
  letter-spacing: 0.5px;
`;

const StyledFormSuggest = styled(Text)`
  color: #333;
  font-family: 'singularity';
  font-size: 20px;
  text-align: center;
`;

// LoginOptions Component
const StyledLoginOptionsContainer = styled(View)`
  height: 100%;
  justify-content: space-around;
  min-width: 300px;
  max-width: 80%;
  align-items: center;
`;

const StyledLoginOptionsDescription = styled(Text)`
  font-family: 'antipasto-bold';
  letter-spacing: 1px;
  font-size: 20px;
  color: ${colors.primary};
  text-align: center;
`;

// Sprite Component
const StyledSpriteContainer = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100px;
`;

const StyledTileContainer = styled(View)`
  display: flex;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  overflow: hidden;
  transform: scale(${({ scale }) => `${scale}, ${scale}`});
  transform-origin: top left;
`;

const StyledSpriteImage = styled(Image)`
  left: -${({ left }) => left}px;
`;

// DokiHome Component
const StyledDokiHomeBackground = styled(ImageBackground)`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const StyledDokiContainer = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px;
`;

const StyledDokiEggContainer = styled(StyledDokiContainer)`
  margin-top: 120px;
`;

// DokiView
const StyledOuterCountersContainer = styled(View)`
  display: flex;
  width: 360px;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

const StyledDokiName = styled(Text)`
  color: black;
  font-size: 30px;
  font-weight: 800;
  text-align: center;
  font-family: 'singularity';
  margin-bottom: 20px;
`;

// DokiProgressBar Component
const StyledOuterProgressBarContainer = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 20px;
`;

const StyledProgressBarContainer = styled(View)`
  width: 350px;
  padding: 5px 0px;
`;

const StyledProgressBar = styled(ProgressBar)`
  align-self: center;
  height: 10px;
  border: solid gray 2.5px;
  border-radius: 30px;
  background-color: gray;
`;

const StyledProgressText = styled(Text)`
  align-self: flex-end;
  padding: 5px 0px;
  font-size: 35px;
  font-weight: 800;
  font-family: 'singularity';
`;

// CountDisplay Component
const StyledCarrotCountContainer = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100px;
  padding-left: 20px;
`;

const StyledStepCountContainer = styled(StyledCarrotCountContainer)`
  width: 200px;
  padding-left: 0px;
`;

const StyledCounterText = styled(Text)`
  font-size: 35px;
  font-weight: 800;
  font-family: 'singularity';
  margin: 10px;
`;

// Health Stats Component
const StyledHealthStatContainer = styled(View)`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const StyledDayContainer = styled(View)`
  display: flex;
  align-items: stretch;
  margin: 10px;
`;

const StyledInternalContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
`;

// SelectEgg Component

const StyledInput = styled(RNP_TextInput)`
  backgroundcolor: #fff;
  height: 40px;
  width: 200px;
`;

const StyledHeader = styled(Text)`
  font-size: 40px;
  color: #fff;
  font-weight: 800;
  text-align: center;
  margin-bottom: 20px;
  font-family: 'antipasto-bold';
`;

export {
  // General Styles
  StyledLogoHeading,
  StyledHeading1,
  StyledHeading2,
  StyledContainer,
  // Form Styles
  StyledFormBackground,
  StyledFormContainer,
  StyledFormTextInput,
  StyledFormButton,
  StyledFormButtonText,
  StyledFormSuggest,
  // LoginOptions Component
  StyledLoginOptionsContainer,
  StyledLoginOptionsDescription,
  // Sprite Component
  StyledSpriteContainer,
  StyledTileContainer,
  StyledSpriteImage,
  // DokiHome Component
  StyledDokiHomeBackground,
  StyledDokiContainer,
  StyledDokiEggContainer,
  StyledOuterProgressBarContainer,
  // DokiProgressBar Component
  StyledProgressBarContainer,
  StyledProgressBar,
  StyledProgressText,
  StyledDokiName,
  // DokiView Component
  StyledOuterCountersContainer,
  // CountDisplay Component
  StyledCarrotCountContainer,
  StyledStepCountContainer,
  StyledCounterText,
  // HealthStats Component
  StyledHealthStatContainer,
  StyledDayContainer,
  StyledInternalContainer,
  // SelectEgg Component
  StyledInput,
  StyledHeader,
};
