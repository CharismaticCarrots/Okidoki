import { StyledDokiHomeBackground, StyledDokiEggContainer, StyledOuterProgressBarContainer } from '../styles';
import { Button } from 'react-native-paper';
import DokiProgressBar from './DokiProgressBar';
import DokiEgg from './DokiEgg';
import { useHatchProgress } from '../../hooks/useHatchProgress';

const DokiEggView = ({ navigation }) => {
  const [ hatchProgress, totalSteps, userGoal ] = useHatchProgress();

  return (
    <StyledDokiHomeBackground source={require("../../../assets/dokihome_background.png")} resizeMode="cover">
        <StyledOuterProgressBarContainer>
          <DokiProgressBar name="Hatch" progress={0.75}/>
        </StyledOuterProgressBarContainer>
      <StyledDokiEggContainer>
        <DokiEgg />
      </StyledDokiEggContainer>
      <Button onPress={() => navigation.navigate('DokiView') } mode='contained'>
          {userGoal}
      </Button>
    </StyledDokiHomeBackground>
  );
};

export default DokiEggView;
