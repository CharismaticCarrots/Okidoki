import {
  StyledDokiHomeBackground,
  StyledDokiEggContainer,
  StyledOuterProgressBarContainer,
  StyledOuterCountersContainer,
  StyledDokiName,
} from '../styles';
import { Button } from 'react-native-paper';
import DokiProgressBar from './DokiProgressBar';
import DokiEgg from './DokiEgg';
import CountDisplay from './CountDisplay';

const DokiEggView = ({ navigation, hatchProgressData, userDokiData }) => {
  const { hatchProgress, totalSteps, dailyStepGoal } = hatchProgressData;

  return (
    <StyledDokiHomeBackground
      source={require('../../../assets/backgrounds/dokihome_background.png')}
      resizeMode="cover"
    >
      <StyledOuterProgressBarContainer>
        <DokiProgressBar name="Hatch" progress={hatchProgress} />
      </StyledOuterProgressBarContainer>
      <StyledOuterCountersContainer>
        <CountDisplay
          counterType={'step'}
          count={totalSteps}
          goalCount={dailyStepGoal}
        />
      </StyledOuterCountersContainer>
      <StyledDokiEggContainer>
        <DokiEgg />
        <StyledDokiName>{userDokiData && userDokiData.user_doki.dokiName}</StyledDokiName>
      </StyledDokiEggContainer>
      <Button onPress={() => navigation.navigate('DokiView')} mode="contained">
        Hatch
      </Button>
    </StyledDokiHomeBackground>
  );
};

export default DokiEggView;
