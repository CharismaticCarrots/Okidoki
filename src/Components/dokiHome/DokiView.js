import { useEffect, useState, useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { Popable, usePopable } from 'react-native-popable';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Button } from 'react-native-paper';
import {
  StyledDokiHomeBackground,
  StyledDokiContainer,
  StyledOuterProgressBarContainer,
  StyledOuterCountersContainer,
  StyledDokiNameTag,
  StyledDokiName,
  StyledDokiPackContainer,
  StyledDokiPackImage,
} from '../styles';
import DokiProgressBar from './DokiProgressBar';
import Doki from './Doki';
import DokiDrawer from './DokiDrawer';
import CountDisplay from './CountDisplay';
import { useDailyStepCount } from '../../Healthkit';
import { useUserData } from '../../hooks/useUserData';
import { useUserDokiData } from '../../hooks/useUserDokiData';
import { useUpdateUser } from '../../hooks/useUpdateUser';
import { useCarrotReward } from '../../hooks/useCarrotReward';

const DokiView = ({ now }) => {
  const refRBSheet = useRef();
  const [userDoki, setUserDoki] = useState();
  const [curCarrotCount, setCurCarrotCount] = useState(0);
  const [curFullnessLvl, setCurFullnessLvl] = useState(0);
  const [curMoodLvl, setCurMoodLvl] = useState(0);
  const [carrotsClaimed, setCarrotsClaimed] = useState(false);
  const [dokiMood, setDokiMood] = useState('');
  const [dokiLevel, setDokiLevel] = useState(1);
  const [msgContent, setMsgContent] = useState(null);

  const stepCount = useDailyStepCount(now);
  // const carrotReward = useCarrotReward(now);
  const carrotReward = 100;
  const { user } = useUserData();
  const userDokiData = useUserDokiData();
  const userMutation = useUpdateUser();
  const { ref, hide, show } = usePopable();

  useEffect(() => {
    if (userDokiData) {
      setUserDoki(userDokiData);
      const { user_doki } = userDokiData;

      const hrsSinceLastFed = Math.floor(
        (new Date().getTime() - new Date(user_doki.lastFedAt).getTime()) /
          3600000
      );
      const newFullnessLvl = user_doki.lastFedFullnessLevel - hrsSinceLastFed;
      setCurFullnessLvl(newFullnessLvl <= 0 ? 0 : newFullnessLvl);

      const hrsSinceLastPlayed = Math.floor(
        (new Date().getTime() - new Date(user_doki.lastPlayedAt).getTime()) /
          3600000
      );
      const newMoodLvl = user_doki.lastPlayedMoodLevel - hrsSinceLastPlayed;
      setCurMoodLvl(newMoodLvl <= 0 ? 0 : newMoodLvl);
    }
  }, [userDokiData]);

  useEffect(() => {
    if (user) {
      setCurCarrotCount(user.carrotCount);

      const claimedToday =
        new Date().toDateString() ===
        new Date(user.lastCarrotsClaimedAt).toDateString();

      if (claimedToday) {
        setCarrotsClaimed(true);
      }
    }
  }, [user, carrotReward]);

  useEffect(() => {
    if (curFullnessLvl === 0 || curMoodLvl === 0) {
      setDokiMood('sleep');
    } else if (curFullnessLvl === 100 || curMoodLvl === 100) {
      setDokiMood('happy');
    } else {
      setDokiMood('idle');
    }
  }, [curFullnessLvl, curMoodLvl]);

  return (
    <StyledDokiHomeBackground
      source={require('../../../assets/backgrounds/dokihome_background.png')}
      resizeMode="cover"
    >
      <StyledOuterProgressBarContainer>
        <DokiProgressBar name="Mood" level={curMoodLvl} total={100} />
        <DokiProgressBar name="Fullness" level={curFullnessLvl} total={100} />
      </StyledOuterProgressBarContainer>
      <StyledOuterCountersContainer>
        <CountDisplay
          counterType={'step'}
          count={stepCount}
          goalCount={user && user.dailyStepGoal}
        />
        <CountDisplay counterType={'carrot'} count={curCarrotCount} />
      </StyledOuterCountersContainer>
      {Boolean(carrotReward) && !carrotsClaimed && (
        <Button
          mode="contained"
          onPress={claimCarrots}
          style={{ position: "absolute", top: 250, backgroundColor: "#5FB8FD"}}>
          {`CLAIM ${carrotReward} CARROTS`}
        </Button>
      )}
      <StyledDokiContainer>
        <Popable
          ref={ref}
          content={msgContent}
          style={{ alignSelf: "center", width: 250, marginTop: 330 }}
          animationType="spring"
        ></Popable>
        <TouchableOpacity onPress={pressDoki}>
          {userDoki && <Doki userDoki={userDoki} dokiMood={dokiMood} />}
        </TouchableOpacity>
      </StyledDokiContainer>
      <StyledDokiNameTag
        source={require('../../../assets/backgrounds/dokiNameTag.png')}
      >
        <StyledDokiName>
          {userDokiData && userDokiData.user_doki.dokiName}
        </StyledDokiName>
        <StyledDokiName>
          Lvl: {dokiLevel}
        </StyledDokiName>
      </StyledDokiNameTag>

      <StyledDokiPackContainer onPress={() => refRBSheet.current.open()}>
        <StyledDokiPackImage
          source={require('../../../assets/items/dokipack.png')}
        />
      </StyledDokiPackContainer>

      <RBSheet
        ref={refRBSheet}
        closeOnSwipeDown={false}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#134845',
          },
          container: {
            backgroundColor: '#F7A24A',
          },
        }}
        height={160}
      >
        <DokiDrawer
          curCarrotCount={curCarrotCount}
          curFullnessLvl={curFullnessLvl}
          curMoodLvl={curMoodLvl}
        />
      </RBSheet>
    </StyledDokiHomeBackground>
  );

  function claimCarrots() {
    userMutation.mutate(
      {
        lastCarrotsClaimedAt: new Date(),
        carrotCount: curCarrotCount + carrotReward,
      },
      {
        onSuccess: ({ carrotCount }) => {
          setCurCarrotCount(carrotCount);
          setCarrotsClaimed(true);
        },
      }
    );
  };

  function pressDoki() {
    setMsgContent("HEY THAT TICKLES!");
    show();
    setTimeout(() => hide(), 1000);
  };
};

export default DokiView;
