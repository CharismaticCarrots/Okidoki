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
import { ProgressBar, Card } from 'react-native-paper';

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
  font-family: 'Singularity';
  letter-spacing: 2px;
`;

const StyledHeading1 = styled(Text)`
  font-size: 35px;
  color: ${colors.primary};
  font-weight: 500;
  text-align: center;
  margin-bottom: 20px;
  font-family: 'AntipastoBold';
  letter-spacing: 1px;
`;

const StyledHeading2 = styled(Text)`
  font-size: 25px;
  color: ${colors.text.dark};
  font-weight: 500;
  text-align: center;
  margin-bottom: 10px;
  font-family: 'Singularity';
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
  width: 100%;
  height: 100%;
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
  font-size: 24px;
  margin-bottom: 4px;
  font-family: 'Singularity';
  color: ${colors.text.dark};
  border: solid grey 3px;
`;

const StyledFormButton = styled(TouchableOpacity)`
  background-color: ${colors.primary};
  padding: 15px;
  border-radius: 50px;
  align-items: center;
`;

const StyledFormButtonText = styled(Text)`
  font-family: 'Singularity';
  font-size: 24px;
  color: ${colors.secondary};
  letter-spacing: 0.5px;
`;

const StyledFormSuggest = styled(Text)`
  color: #333;
  font-family: 'Singularity';
  font-size: 25px;
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
  font-family: 'AntipastoBold';
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
  margin-bottom: 85px;
`;

const StyledDokiContainer = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px;
`;

const StyledDokiEggContainer = styled(StyledDokiContainer)`
  margin-top: 120px;
`;

// DokiView Component
const StyledOuterCountersContainer = styled(View)`
  display: flex;
  width: 350px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 10px;
`;

const StyledDokiName = styled(Text)`
  color: black;
  font-size: 30px;
  font-weight: 800;
  text-align: center;
  font-family: 'Singularity';
  margin-bottom: 20px;
`;

// Doki Component
const StyledInnerDokiContainer = styled(View)`
  display: flex;
  padding-top: 0px;
  width: 250px;
  height: 300px;
  justify-content: center;
  align-items: center;
  padding-bottom: 30px;
`;

// DokiProgressBar Component
const StyledOuterProgressBarContainer = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 60px;
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
  font-family: 'Singularity';
  color: #f3ce72;
`;

const StyledProgressTextSmall = styled(StyledProgressText)`
  font-size: 25px;
`;

// CountDisplay Component
const StyledCountDisplayContainer = styled(View)`
  display: flex;
`;

const StyledCarrotCountContainer = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const StyledStepCountContainer = styled(StyledCarrotCountContainer)`
  justify-content: flex-start;
`;

const StyledCounterText = styled(Text)`
  font-size: 30px;
  font-weight: 800;
  font-family: 'Singularity';
  margin: 10px;
  color: #f3ce72;
`;

// Health Stats Component
const StyledHealthStatContainer = styled(View)`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 80px;
`;

const StyledHealthStatHeading = styled(Text)`
  font-size: 35px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 20px;
  font-family: 'AntipastoBold';
  letter-spacing: 1px;
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

// DokiDrawer and UserItem
const StyledItemContainer = styled(View)`
  height: 80px;
  width: 80px;
  justify-content: center;
  align-content: center;
  background-color: #ffefb4;
  padding: 8px;
  border-radius: 10px;
  margin: 15px;
`;

const StyledItemImage = styled(Image)`
  margin-left: auto;
  margin-right: auto;
  height: 90%;
  width: 90%;
`;

const StyledItemQuantity = styled(View)`
  height: 30px;
  width: 30px;
  justify-content: center;
  align-items: center;
  background-color: #c7cdab;
  border-radius: 100px;
  position: absolute;
  bottom: -10px;
  right: -10px;
  z-index: 2;
`;

const StyledItemQuantityText = styled(Text)`
  font-family: 'Singularity';
  font-size: 23px;
  padding: 6px;
`;

const StyledItemCard = styled(Card)`
  height: 130px;
  width: 150px;
  background-color: ${colors.primary};
  margin: 10px;
  padding-top: 15px;
  justify-content: space-evenly;
`;

const StyledItemView = styled(View)`
  display: flex;
  flexdirection: row;
  // alignitems: center;
  margin: 30px;
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
  StyledProgressTextContainer,
  StyledProgressText,
  StyledProgressTextSmall,
  // DokiView Component
  StyledOuterCountersContainer,
  StyledDokiName,
  // Doki Component
  StyledInnerDokiContainer,
  // CountDisplay Component
  StyledCountDisplayContainer,
  StyledCarrotCountContainer,
  StyledStepCountContainer,
  StyledCounterText,
  // HealthStats Component
  StyledHealthStatContainer,
  StyledDayContainer,
  StyledInternalContainer,
  StyledHealthStatHeading,
  // UserItem Component
  StyledItemContainer,
  StyledItemImage,
  StyledItemQuantity,
  StyledItemQuantityText,
  StyledItemCard,
  StyledItemView,
};
