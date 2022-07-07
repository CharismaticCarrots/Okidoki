// Index of Styled Components
import styled from 'styled-components';
import { View, Image, ImageBackground, Text } from 'react-native';
import { ProgressBar, TextInput } from 'react-native-paper';

// General Styles
const StyledHeading1 = styled(Text)`
  font-size: 30px;
  color: #333;
  font-weight: 500;
  text-align: center;
  margin-bottom: 20px;
`;

const StyledContainer = styled(View)`
  alignitems: 'center';
  padding: 20px 30px;
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

const StyledDokiEggContainer = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 50px;
  margin-top: 150px;
  margin-bottom: 50px;
  width: 300px;
  height: 300px;
`;

// DokiView

const StyledOuterCountersContainer = styled(View)`
  display: flex;
  width: 360px;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

// SignUp & SignIn Components
const StyledOuterProgressBarContainer = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 20px;
`;

// DokiProgressBar Component
const StyledProgressBarContainer = styled(View)`
  width: 350px;
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
  font-size: 22px;
  font-weight: bold;
  padding: 5px 0px;
`;

// Health stats component
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

//SelectEgg

const StyledInput = styled(TextInput)`
backgroundColor: #fff;
height: 40px;
width: 200px;
`;

export {
  // General Styles
  StyledHeading1,
  StyledContainer,
  // Sprite Component
  StyledSpriteContainer,
  StyledTileContainer,
  StyledSpriteImage,
  // DokiHome Component
  StyledDokiHomeBackground,
  StyledDokiEggContainer,
  StyledOuterProgressBarContainer,
  // DokiProgressBar Component
  StyledProgressBarContainer,
  StyledProgressBar,
  StyledProgressText,
  // DokiView
  StyledOuterCountersContainer,
  //healthState component
  StyledHealthStatContainer,
  StyledDayContainer,
  StyledInternalContainer,
  //SelectEgg component
  StyledInput
};
