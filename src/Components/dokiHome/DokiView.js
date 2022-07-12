import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import { API_URL } from '../../../secrets';
import * as SecureStore from 'expo-secure-store';
import { Popable, usePopable } from 'react-native-popable';
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
import { getCarrotReward } from '../../helpers/getCarrotReward';

import { StyleSheet } from 'react-native';

const DokiView = ({ now }) => {
  const [curCarrotCount, setCurCarrotCount] = useState(0);
  const [userDoki, setUserDoki] = useState();
  const [curFullnessLvl, setCurFullnessLvl] = useState(0);
  const [carrotReward, setCarrotReward] = useState(null);
  const [carrotsClaimed, setCarrotsClaimed] = useState(false);
  const [msgContent, setMsgContent] = useState(null);

  const stepCount = useDailyStepCount(now);
  const { user } = useUserData();
  const userDokiData = useUserDokiData();
  const carrotRewardData = getCarrotReward();
  const { ref, hide, show } = usePopable();

  console.log("CARROTS REWARDED:", carrotReward) // Temp message to indicate carrots to reward

  useEffect(() => {
    if (user) {
      setCurCarrotCount(user.carrotCount);
      const hrsSinceLastClaimed = (new Date() - new Date(user.lastCarrotsClaimedAt))/3600000;
      if (hrsSinceLastClaimed <= 24) {
        setCarrotsClaimed(true);
        console.log(`Can't claim carrots yet, last claimed ${hrsSinceLastClaimed} hours ago. Check again tomorrow!`) // Temporary Error Message
      }

    }
  }, [user]);

  useEffect(() => {
    if (userDokiData) {
      // userDokiData.type = 'fox'; // Dummy data to view different sprites
      setUserDoki(userDokiData);

      const { user_doki } = userDokiData;
      const hrsSinceLastFed = Math.floor(
        (new Date().getTime() - new Date(user_doki.lastFedAt).getTime()) /
          3600000
      );
      setCurFullnessLvl(user_doki.lastFedFullnessLevel - hrsSinceLastFed);
    }
  }, [userDokiData]);

  useEffect(() => {
    if (carrotRewardData) {
      setCarrotReward(carrotRewardData);
    }
  }, [carrotRewardData]);

  const userDokiMutation = useMutation(async (userDokiUpdate) => {
    const token = await SecureStore.getItemAsync('TOKEN');
    if (token) {
      const { data: updatedUserDoki } = await axios.put(
        `http://${API_URL}/api/user/doki`,
        userDokiUpdate,
        {
          headers: {
            authorization: token,
          },
        }
      );
      return updatedUserDoki;
    }
  });

  const userMutation = useMutation(async (userUpdate) => {
    const token = await SecureStore.getItemAsync('TOKEN');
    if (token) {
      const { data: updatedUserDoki } = await axios.put(
        `http://${API_URL}/api/user/`,
        userUpdate,
        {
          headers: {
            authorization: token,
          },
        }
      );
      return updatedUserDoki;
    }
  });

  const feedDoki = () => {
    if (curCarrotCount === 0 || curFullnessLvl === 100) {
      if (curCarrotCount === 0) {
        console.log('UH OH, OUT OF CARROTS'); // Temporary error message
        show();
        setTimeout(() => hide(), 1000);
        setMsgContent('UH OH, YOU\'RE OUT OF CARROTS!');
      }
      if (curFullnessLvl === 100) {
        show();
        setTimeout(() => hide(), 1000);
        setMsgContent('DOKI IS TOO FULL RIGHT NOW!');
      }
    } else {
      const userDokiUpdate = {
        lastFedAt: new Date(),
        lastFedFullnessLevel: curFullnessLvl + 1,
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
      {carrotReward && !carrotsClaimed &&
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

