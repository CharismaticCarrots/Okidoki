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
import { useUserDokiData } from '../../hooks/useUserDokiData';

const DokiEggView = ({ navigation, hatchProgressData }) => {
  const { totalSteps, dailyStepGoal } = hatchProgressData;
  const userDokiData = useUserDokiData();

  return (
    <StyledDokiHomeBackground
      source={require('../../../assets/backgrounds/dokihome_background.png')}
      resizeMode="cover"
    >
      <StyledOuterProgressBarContainer>
        <DokiProgressBar
          name="Hatch"
          level={totalSteps}
          total={dailyStepGoal}
        />
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
    </StyledDokiHomeBackground>
  );
};

export default DokiEggView;
