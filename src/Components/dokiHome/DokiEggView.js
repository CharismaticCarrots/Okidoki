import { TouchableOpacity } from 'react-native';
import {
  StyledDokiHomeBackground,
  StyledDokiEggContainer,
  StyledOuterProgressBarContainer,
  StyledOuterCountersContainer,
  StyledDokiName,
} from '../styles';
import DokiProgressBar from './DokiProgressBar';
import DokiEgg from './DokiEgg';
import CountDisplay from './CountDisplay';
import { useQueryClient } from 'react-query';
import { useHatchProgress } from '../../hooks/useHatchProgress';
import { useUserDokiData } from '../../hooks/useUserDokiData';
import { useUpdateUserDoki } from '../../hooks/useUpdateUserDoki';

const DokiEggView = ({now}) => {
  const hatchProgressData = useHatchProgress(now);
  const userDokiMutation = useUpdateUserDoki();
  const queryClient = useQueryClient();
  const userDokiData = useUserDokiData();
  const { totalSteps, dailyStepGoal } = hatchProgressData;

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
        <TouchableOpacity onPress={hatchDokiEgg}>
          <DokiEgg />
        </TouchableOpacity>
        <StyledDokiName>
          {userDokiData && userDokiData.user_doki.dokiName}
        </StyledDokiName>
      </StyledDokiEggContainer>
    </StyledDokiHomeBackground>
  );

  function hatchDokiEgg () {
    console.log("HATCH!")
    const isEggNow = hatchProgressData.hatchProgress < 1;
    if (userDokiData.user_doki.isEgg && !isEggNow) {
      userDokiMutation.mutate({
        isEgg: false
      }, {
        onSuccess: () => {
          queryClient.invalidateQueries(['userDoki']);
        }
      });
    }
  }
};

export default DokiEggView;
