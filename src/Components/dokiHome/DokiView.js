import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { useMutation } from 'react-query';
import axios from 'axios';
import { API_URL } from '../../../secrets';
import * as SecureStore from 'expo-secure-store';
import { Popable, usePopable } from 'react-native-popable';
import { Button, Text } from 'react-native-paper';
import RBSheet from "react-native-raw-bottom-sheet";
import {
  StyledDokiHomeBackground,
  StyledDokiContainer,
  StyledOuterProgressBarContainer,
  StyledOuterCountersContainer,
  StyledDokiName,
} from '../styles';
import DokiProgressBar from './DokiProgressBar';
import Doki from './Doki';
import DokiDrawer from './DokiDrawer';
import CountDisplay from './CountDisplay';
import { useDailyStepCount } from '../../Healthkit';
import { useUserData } from '../../hooks/useUserData';
import { useUserDokiData } from '../../hooks/useUserDokiData';
import { useUpdateUserDoki } from '../../hooks/useUpdateUserDoki';
import { useUpdateUser } from '../../hooks/useUpdateUser';
import { useCarrotReward } from '../../hooks/useCarrotReward';


const DokiView = ({ now }) => {
  const refRBSheet = useRef();

  const [curCarrotCount, setCurCarrotCount] = useState(0);
  const [userDoki, setUserDoki] = useState();
  const [curFullnessLvl, setCurFullnessLvl] = useState(0);
  const [carrotsClaimed, setCarrotsClaimed] = useState(false);
  const [msgContent, setMsgContent] = useState(null);

  const stepCount = useDailyStepCount(now);
  const { user } = useUserData();
  const userDokiData = useUserDokiData();
  const carrotReward = useCarrotReward(now);
  const userDokiMutation = useUpdateUserDoki();
  const userMutation = useUpdateUser();
  const { ref, hide, show } = usePopable();

  // sets carrotsClaimed status
  useEffect(() => {
    if (user) {
      setCurCarrotCount(user.carrotCount);
      console.log("USER TOKEN:", user.token) // Temporary console log to view token
      const claimedToday = new Date(now).toDateString() === new Date(user.lastCarrotsClaimedAt).toDateString();

      if (claimedToday) {
        setCarrotsClaimed(true);
        console.log(`Can't claim carrots yet, last claimed at ${new Date(user.lastCarrotsClaimedAt).toLocaleString('en-US', { timeZone: 'UTC' })}. Check again tomorrow!`) // Temporary Error Message
      } else {
        console.log(`LAST CLAIMED CARROTS AT: ${new Date(user.lastCarrotsClaimedAt).toLocaleString('en-US', { timeZone: 'UTC' })}`) // Temporary Console log to test
      }
    }
  }, [user, carrotReward, now]);

  // sets new fullnesslevel based on lastfedAt date
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
        show();
        setTimeout(() => hide(), 1000);
        setMsgContent('DOKI IS TOO FULL RIGHT NOW!');
      }
    } else {
      const newFullnessLevel = curFullnessLvl + 5;
      const userDokiUpdate = {
        lastFedAt: new Date(),
        lastFedFullnessLevel: curFullnessLvl + (newFullnessLevel > 100 ? 100 - curFullnessLvl : 5), // Carrot-FullnessLevel Exchange Rate
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
      <Button mode="contained" onPress={() => refRBSheet.current.open()} > OPEN PACK </Button>
      <RBSheet
        ref={refRBSheet}
        closeOnSwipeDown={false}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#ffefb4"
          },
          container:{
            backgroundColor:'#59b2ff'
          }
        }}
        height={150}
        closeOnPressMask={true}
      >
        <DokiDrawer carrotCount={curCarrotCount} feedDoki={feedDoki}/>
      </RBSheet>
    </StyledDokiHomeBackground>
  );
};

export default DokiView;


const popoverStyles = StyleSheet.create({
  alignSelf: "center",
  marginTop: 350,
  width: 200,
});

