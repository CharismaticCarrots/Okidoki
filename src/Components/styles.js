// Index of Styled Components
import styled from 'styled-components';
import {
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native';
import { ProgressBar, TextInput } from 'react-native-paper';

// Color Palette
const colorPalette = {
  primary: '#ffefb4',
  secondary: '#59b2ff',
  tertiary: '#C7CDAB',
};

// General Styles
const StyledLogoHeading = styled(Text)`
  font-size: 70px;
  font-weight: 500;
  text-align: center;
  color: ${colorPalette.primary};
  font-family: 'singularity';
  letter-spacing: 2px;
`;

const StyledHeading1 = styled(Text)`
  font-size: 30px;
  color: #333;
  font-weight: 500;
  text-align: center;
  margin-bottom: 20px;
  font-family: 'antipasto-bold';
`;

const StyledHeading2 = styled(Text)`
  font-size: 20px;
  color: #333;
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
const StyledFormContainer = styled(View)`
  display: flex;
  flex: 1;
`;

const StyledFormBackground = styled(ImageBackground)`
  display: flex;
  flex: 1;
  align-items: center;
`;

const StyledFormContentContainer = styled(View)`
  height: 100%;
  justify-content: space-around;
  min-width: 300px;
  max-width: 80%;
  align-items: center;
`;

const StyledFormDescription = styled(Text)`
  font-family: 'antipasto-bold';
  letter-spacing: 1px;
  font-size: 20px;
  color: ${colorPalette.primary};
  text-align: center;
`;

const StyledFormButton = styled(TouchableOpacity)`
  background-color: ${colorPalette.primary};
  padding: 15px;
  border-radius: 50px;
  width: 220px;
  align-items: center;
`;

const StyledFormButtonText = styled(Text)`
  font-family: 'singularity';
  font-size: 22px;
  color: ${colorPalette.secondary};
  letter-spacing: 0.5px;
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
  width: 350px;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
  padding-right: 5px;

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

const StyledProgressTextContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledProgressText = styled(Text)`
  padding: 5px 0px;
  font-size: 35px;
  font-weight: 800;
  font-family: 'singularity';
`;

const StyledProgressTextSmall = styled(StyledProgressText)`
  font-size: 25px;
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
  font-size: 30px;
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

const StyledInput = styled(TextInput)`
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
  StyledFormContainer,
  StyledFormBackground,
  StyledFormContentContainer,
  StyledFormDescription,
  StyledFormButton,
  StyledFormButtonText,
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
  StyledProgressTextContainer,
  StyledProgressText,
  StyledProgressTextSmall,
  // DokiView Component
  StyledOuterCountersContainer,
  StyledDokiName,
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
