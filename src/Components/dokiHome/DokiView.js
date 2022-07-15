import React, { useEffect, useState, useRef } from 'react';
<<<<<<< HEAD
import notifee from '@notifee/react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
=======
import RBSheet from "react-native-raw-bottom-sheet";
>>>>>>> main
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
import DokiDrawer from './DokiDrawer';
import CountDisplay from './CountDisplay';
import { useQueryClient } from 'react-query';
import { useDailyStepCount } from '../../Healthkit';
import { useUserData } from '../../hooks/useUserData';
import { useUserDokiData } from '../../hooks/useUserDokiData';
import { useUpdateUserDoki } from '../../hooks/useUpdateUserDoki';
import { useUpdateUser } from '../../hooks/useUpdateUser';
import { useCarrotReward } from '../../hooks/useCarrotReward';
import { createTriggerNotification } from '../../helpers/createTriggerNotification';


const DokiView = ({ now }) => {
  const refRBSheet = useRef();
  const [userDoki, setUserDoki] = useState();
  const [curCarrotCount, setCurCarrotCount] = useState(0);
  const [curFullnessLvl, setCurFullnessLvl] = useState(0);
  const [carrotsClaimed, setCarrotsClaimed] = useState(false);
  const [curMoodLvl, setCurMoodLvl] = useState(0);

  const [msgContent, setMsgContent] = useState(null);

  const stepCount = useDailyStepCount(now);
  const { user } = useUserData();
  const userDokiData = useUserDokiData();
  const carrotReward = useCarrotReward(now);
  const userDokiMutation = useUpdateUserDoki();
  const userMutation = useUpdateUser();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (user) {
      setCurCarrotCount(user.carrotCount);
      console.log('USER TOKEN:', user.token); // Temporary console log to view token
      const claimedToday =
        new Date(now).toDateString() ===
        new Date(user.lastCarrotsClaimedAt).toDateString();

      if (claimedToday) {
        setCarrotsClaimed(true);
        console.log(
          `Can't claim carrots yet, last claimed at ${new Date(
            user.lastCarrotsClaimedAt
          ).toLocaleString('en-US')}. Check again tomorrow!`
        ); // Temporary Error Message
      }
      // console.log(`LAST CLAIMED CARROTS AT: ${new Date(user.lastCarrotsClaimedAt).toLocaleString('en-US')}`); // FOR TESTING
    }
  }, [user, carrotReward, now]);

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

      const hrsSinceLastPlayed = Math.floor(
        (new Date(now).getTime() - new Date(user_doki.lastPlayedAt).getTime()) /
          3600000
      );
      setCurMoodLvl(user_doki.lastPlayedMoodLevel - hrsSinceLastPlayed);
    }
  }, [userDokiData, now]);

  const feedDoki = () => {
    if (curCarrotCount <= 0 || curFullnessLvl >= 100) {
      if (curCarrotCount <= 0) {
        setMsgContent("UH OH, YOU'RE OUT OF CARROTS!");
      }
      if (curFullnessLvl >= 100) {
        setMsgContent("I'M TOO FULL RIGHT NOW!");
      }
    } else {
      const newFullnessLevel = curFullnessLvl + 5;
      const userDokiUpdate = {
        lastFedAt: new Date(),
        lastFedFullnessLevel:
          curFullnessLvl + (newFullnessLevel > 100 ? 100 - curFullnessLvl : 5), // Carrot-FullnessLevel Increase Rate
      };
      userDokiMutation.mutate(userDokiUpdate, {
        onSuccess: () => {
          queryClient.invalidateQueries(['userDoki'])
        },
      });
      userMutation.mutate(
        { carrotCount: curCarrotCount - 1 },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(['user'])
          },
        }
      );
      setMsgContent('OM NOM NOM');
      createTriggerNotification('feed');
    }
  };

  const playWithDoki = () => {
    if (curMoodLvl >= 100) {
      setMsgContent("I'M ALL PLAYED OUT!");
    } else {
      const newMoodLevel = curMoodLvl + 5;
      const userDokiUpdate = {
        lastPlayedAt: new Date(),
        lastPlayedMoodLevel:
          curMoodLvl + (newMoodLevel > 100 ? 100 - curMoodLvl : 5), // Mood Increase Rate
      };
      userDokiMutation.mutate(userDokiUpdate, {
        onSuccess: () => {
          queryClient.invalidateQueries(['userDoki'])
        },
      });
      setMsgContent('THIS IS SO MUCH FUN!');
      createTriggerNotification('play');
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

<<<<<<< HEAD
  const onDisplayNotification = async () => {
    await notifee.requestPermission();
    await notifee.displayNotification({
      title: 'HELLO',
      body: 'HELLO HELLO FROM TEAM CARROT',
    });
  };

=======
>>>>>>> main
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
        <Button mode="contained" onPress={claimCarrots}>
            {`CLAIM ${carrotReward} CARROTS`}
        </Button>)}
      <StyledDokiContainer>
        {userDoki && <Doki userDoki={userDoki} />}
        <StyledDokiName>
          {userDokiData && userDokiData.user_doki.dokiName}
        </StyledDokiName>
      </StyledDokiContainer>
      {/* <Button onPress={feedDoki} mode="contained">
        Feed Doki
      </Button> */}
      <Button mode="contained" onPress={() => refRBSheet.current.open()}>
        DOKI PACK
      </Button>
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
            backgroundColor: '#6B4B3E',
            // 6B4B3E — darker brown
            // 725E54 — medium brown
            // A57548 — lighter brown
          },
        }}
        height={170}
      >
        <DokiDrawer
          carrotCount={curCarrotCount}
          feedDoki={feedDoki}
          playWithDoki={playWithDoki}
          msgContent={msgContent}
        />
      </RBSheet>
    </StyledDokiHomeBackground>
  );
};

export default DokiView;
