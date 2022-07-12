import React, { useEffect, useState } from 'react';
import { Popable, usePopable } from 'react-native-popable';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import {
  StyledDokiHomeBackground,
  StyledDokiContainer,
  StyledOuterProgressBarContainer,
  StyledOuterCountersContainer,
  StyledDokiName,
} from '../styles';
import DokiProgressBar from './DokiProgressBar';
import Doki from './Doki';
import CountDisplay from './CountDisplay';
import { useDailyStepCount } from '../../Healthkit';
import { useUserData } from '../../hooks/useUserData';
import { useUserDokiData } from '../../hooks/useUserDokiData';
import { useUpdateUserDoki } from '../../hooks/useUpdateUserDoki';
import { useUpdateUser } from '../../hooks/useUpdateUser';
import { useCarrotReward } from '../../hooks/useCarrotReward';


const DokiView = ({ now }) => {
  const [curCarrotCount, setCurCarrotCount] = useState(0);
  const [userDoki, setUserDoki] = useState();
  const [curFullnessLvl, setCurFullnessLvl] = useState(0);
  const [carrotsClaimed, setCarrotsClaimed] = useState(false);
  const [msgContent, setMsgContent] = useState(null);

  const stepCount = useDailyStepCount(now);
  console.log("TODAY'S STEP COUNT", stepCount)
  const { user } = useUserData();
  const userDokiData = useUserDokiData();
  const carrotReward = useCarrotReward(now);
  console.log("CARROT REWARD", carrotReward)
  const userDokiMutation = useUpdateUserDoki();
  const userMutation = useUpdateUser();
  const { ref, hide, show } = usePopable();

  // setsCarrotsClaimedStatus
  useEffect(() => {
    if (user) {
      setCurCarrotCount(user.carrotCount);
      const hrsSinceLastClaimed = (new Date() - new Date(user.lastCarrotsClaimedAt))/3600000;
      console.log("USER TOKEN:", user.token) // Temporary console log to view token

      console.log("LAST CLAIM DATE", user.lastCarrotsClaimedAt)

      if (hrsSinceLastClaimed <= 24) {
        setCarrotsClaimed(true);
        console.log(`Can't claim carrots yet, last claimed ${hrsSinceLastClaimed} hours ago. Check again tomorrow!`) // Temporary Error Message
      }
    }
  }, [user, carrotReward, now]);

  useEffect(() => {
    if (userDokiData) {
      // userDokiData.type = 'fox'; // Dummy data to view different sprites
      setUserDoki(userDokiData);

      const { user_doki } = userDokiData;
      const hrsSinceLastFed = Math.floor(
        (new Date(now).getTime() - new Date(user_doki.lastFedAt).getTime()) / 3600000
      );
      console.log("HOURS SINCE LAST FED", hrsSinceLastFed)
      setCurFullnessLvl(user_doki.lastFedFullnessLevel - hrsSinceLastFed);
    }
  }, [userDokiData, now]);


  const feedDoki = () => {
    if (curCarrotCount <= 0 || curFullnessLvl >= 100) {
      if (curCarrotCount <= 0) {
        show();
        setTimeout(() => hide(), 1000);
        setMsgContent('UH OH, YOU\'RE OUT OF CARROTS!');
      }
      if (curFullnessLvl >= 100) {
        console.log("CUR FULLNESS LEVEL", curFullnessLvl)
        show();
        setTimeout(() => hide(), 1000);
        setMsgContent('DOKI IS TOO FULL RIGHT NOW!');
      }
    } else {
      const userDokiUpdate = {
        lastFedAt: new Date(),
        lastFedFullnessLevel: curFullnessLvl + 5, // Carrot-FullnessLevel Exchange Rate
      };
      userDokiMutation.mutate(userDokiUpdate, {
        onSuccess: ({ lastFedFullnessLevel }) => {
          setCurFullnessLvl(lastFedFullnessLevel);
        },
      });
      userMutation.mutate(
        { carrotCount: curCarrotCount - 1 },
        {
          onSuccess: ({ carrotCount }) => {
            setCurCarrotCount(carrotCount);
          },
        }
      );
      show();
      setTimeout(() => hide(), 1000);
      setMsgContent('OM NOM NOM');
    }
  };

  const claimCarrots = () => {
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

  return (
    <StyledDokiHomeBackground
      source={require('../../../assets/backgrounds/dokihome_background.png')}
      resizeMode="cover"
    >
      <StyledOuterProgressBarContainer>
        <DokiProgressBar
          name="Mood"
          level={userDoki && userDoki.user_doki.lastPlayedMoodLevel}
          total={100}
        />
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
      {Boolean(carrotReward) && !carrotsClaimed &&
        <Button mode="contained" onPress={claimCarrots}>
            {`CLAIM ${carrotReward} CARROTS`}
        </Button>}
      <StyledDokiContainer>
        <Popable
          ref={ref}
          content={msgContent}
          style={popoverStyles}
          animationType="spring"
        >
          {userDoki && <Doki userDoki={userDoki} />}
        </Popable>
        <StyledDokiName>
          {userDokiData && userDokiData.user_doki.dokiName}
        </StyledDokiName>
      </StyledDokiContainer>
      <Button onPress={feedDoki} mode="contained">
        Feed Doki
      </Button>
    </StyledDokiHomeBackground>
  );
};

export default DokiView;


const popoverStyles = StyleSheet.create({
  alignSelf: "center",
  marginTop: 350,
  width: 200,
});

