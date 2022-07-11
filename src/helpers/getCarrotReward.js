import { useUserData } from "../hooks/useUserData";
import { useDailyStepCount } from "../Healthkit";
import subDays from 'date-fns/subDays';

export const getCarrotReward = () => {
  const { user } = useUserData();
  const prevDay = subDays(new Date(), 1).toISOString();
  const prevDaySteps = useDailyStepCount(prevDay);

  if (user) {
    const { dailyStepGoal } = user;
    const carrotReward = Math.floor(prevDaySteps/dailyStepGoal*10);
    return carrotReward;
  }
};
