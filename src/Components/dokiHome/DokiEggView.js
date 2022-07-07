import { StyledDokiHomeBackground, StyledDokiEggContainer, StyledOuterProgressBarContainer } from '../styles';
import { Button } from 'react-native-paper';
import DokiProgressBar from './DokiProgressBar';
import DokiEgg from './DokiEgg';

const DokiEggView = ({ navigation }) => {
  return (
    <StyledDokiHomeBackground source={require("../../../assets/dokihome_background.png")} resizeMode="cover">
        <StyledOuterProgressBarContainer>
          <DokiProgressBar name="Hatch" progress={0.75}/>
        </StyledOuterProgressBarContainer>
      <StyledDokiEggContainer>
        <DokiEgg />
      </StyledDokiEggContainer>
      <Button onPress={() => navigation.navigate('DokiView') } mode='contained'>
          Hatch
      </Button>
    </StyledDokiHomeBackground>
  );
};

export default DokiEggView;
