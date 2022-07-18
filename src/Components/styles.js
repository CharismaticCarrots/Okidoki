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
import { ProgressBar } from 'react-native-paper';

// Color Palette
const colors = {
  yellow: '#ffefb4',
  blue: '#59b2ff',
  tan: '#EFD389',
  text: {
    dark: '#333',
  },
};

// General Styles
const StyledLogoHeading = styled(Text)`
  font-size: 70px;
  font-weight: 500;
  text-align: center;
  color: ${colors.yellow};
  font-family: 'Singularity';
  letter-spacing: 2px;
`;

const StyledHeading1 = styled(Text)`
  font-size: 35px;
  color: ${colors.yellow};
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
  padding: 15px;
  font-size: 18px;
  font-family: 'FredokaOne';
  letter-spacing: 1px;
  color: ${colors.text.dark};
  background: white;
  border-radius: 50px;
  margin-bottom: 10px;
  border: solid ${(props) => (props.error ? `#C23B22` : `${colors.text.dark}`)} 4px;
`;

const StyledFormButton = styled(TouchableOpacity)`
  background-color: ${colors.yellow};
  padding: 15px;
  border-radius: 50px;
  align-items: center;
  border: solid black 4px;
`;

const StyledFormButtonText = styled(Text)`
  font-family: 'Singularity';
  font-size: 24px;
  color: black;
  letter-spacing: 0.5px;
`;

const StyledFormSuggest = styled(Text)`
  color: #333;
  font-family: 'Singularity';
  font-size: 22px;
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
  margin-bottom: 100px;
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
  color: ${colors.text.dark}
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

const StyledFormInputError = styled(Text)`
  color: #C23B22;
  font-family: 'Singularity';
  font-size: 22px;
  padding: 5px;
  border-radius: 50px;
  text-align: center;
`;

// Doki Pack Icon
const StyledDokiPackContainer = styled(TouchableOpacity)`
  // position: absolute;
  // bottom: 0px;
  // right: 0px;
  width: 90px;
  height: 90px;
  background-color: #ffefb4;
  border: solid 3px #333;
  border-radius: 50px;
  padding: 15px;
  // margin: 15px;
`;

const StyledDokiPackImage = styled(Image)`
  height: 100%;
  width: 100%;
`;

// User Settings
const StyledSettingsHeading = styled(Text)`
  font-size: 50px;
  color: ${colors.text.dark};
  font-weight: 300;
  text-align: center;
  margin-top: 80px;
  margin-bottom: 10px;
  font-family: 'AntipastoBold';
`;

const StyledSettingsHeading2 = styled(Text)`
  font-size: 30px;
  color: ${colors.text.dark};
  font-weight: 500;
  text-align: center;
  margin-top: 100px;
  margin-bottom: 40px;
  font-family: 'AntipastoBold';
`;

export {
  // General Styles
  StyledLogoHeading,
  StyledHeading1,
  StyledHeading2,
  // Form Styles
  StyledFormBackground,
  StyledFormContainer,
  StyledFormTextInput,
  StyledFormButton,
  StyledFormButtonText,
  StyledFormSuggest,
  StyledFormInputError,
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
  // DokiDrawer and UserItem Component
  StyledItemContainer,
  StyledItemImage,
  StyledItemQuantity,
  StyledItemQuantityText,
  // Doki Pack Icon
  StyledDokiPackContainer,
  StyledDokiPackImage,
  // UserSettings Component
  StyledSettingsHeading,
  StyledSettingsHeading2,
};
