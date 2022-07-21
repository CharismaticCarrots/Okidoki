import { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Popable, usePopable } from 'react-native-popable';
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
import Sprite from '../Sprite';
import images from '../../images';
import { useQueryClient } from 'react-query';
import { useHatchProgress } from '../../hooks/useHatchProgress';
import { useUserDokiData } from '../../hooks/useUserDokiData';
import { useUpdateUserDoki } from '../../hooks/useUpdateUserDoki';

const DokiEggView = ({now}) => {
  const queryClient = useQueryClient();
  const userDokiData = useUserDokiData();
  const userDokiMutation = useUpdateUserDoki();
  const hatchProgressData = useHatchProgress(now);
  const { totalSteps, dailyStepGoal } = hatchProgressData;
  const { ref, hide, show } = usePopable();
  const [msgContent, setMsgContent] = useState(null);
  const [isHatching, setIsHatching] = useState(null);
  const isEggNow = hatchProgressData.hatchProgress < 1;

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
        <Popable
          ref={ref}
          content={msgContent}
          style={{ alignSelf: "center", width: 250, marginTop: 350}}
          animationType="spring"
          backgroundColor="#59b2ff"
        ></Popable>
        {
          isHatching ?
          <View style={{marginTop: 100, marginBottom: 100}}>
            <Sprite
              src={images.sprites.egg.hatch}
              totalSprites={6}
              tile={{ width: 209, height: 208 }}
              scale={1}
              framesPerSprite={30}
            />
          </View>
          :
          <TouchableOpacity onPress={hatchDokiEgg}>
          <DokiEgg />
          </TouchableOpacity>
        }
        <StyledDokiName>
          {userDokiData && userDokiData.user_doki.dokiName}
        </StyledDokiName>
      </StyledDokiEggContainer>
    </StyledDokiHomeBackground>
  );
  function wait (timeout) {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  function hatchDokiEgg () {
    // const isEggNow = hatchProgressData.hatchProgress < 1;
    if (userDokiData.user_doki.isEgg && !isEggNow) {
      userDokiMutation.mutate({
        isEgg: false
      }, {
        onSuccess: () => {
          setIsHatching(true);
          wait(2000).then(() =>
          queryClient.invalidateQueries(['userDoki']));
        }
      });
    } else {
      setMsgContent('REACH YOUR GOAL TO HATCH ME');
      show();
      setTimeout(() => hide(), 1500);
    }
  }
};

export default DokiEggView;
