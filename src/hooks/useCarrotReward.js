import React, { useEffect, useState } from 'react';
import { useUserData } from "./useUserData";
import { useDailyStepCount } from "../Healthkit";
import subDays from 'date-fns/subDays';

export const useCarrotReward = (now) => {
  console.log("NOW IN CARROT REWARD", now)
  const [carrotReward, setCarrotReward] = useState(null);
  const { user } = useUserData();
  const prevDay = subDays(new Date(now), 1).toISOString();
  const prevDaySteps = useDailyStepCount(prevDay);
  console.log("PREV DAY STEPS", prevDaySteps)

  useEffect(() => {
    if (user && prevDaySteps >= 0) {
      const { dailyStepGoal } = user;
      setCarrotReward(Math.floor(prevDaySteps/dailyStepGoal*10)); // Carrot-StepCount Exchange Rate
    }
  }, [user, prevDaySteps, prevDay])

  console.log("CARROT REWARD IN HOOK",  carrotReward)

  return carrotReward;
};
