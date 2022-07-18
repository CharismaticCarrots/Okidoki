import { useUserData } from './useUserData';
import { useUserDokiData } from './useUserDokiData';
import { useTotalStepCount } from '../Healthkit';

export const useHatchProgress = (now) => {
  const userDoki = useUserDokiData();
  const { user } = useUserData();

  let dokiCreatedDate = null;

  if (userDoki) {
    dokiCreatedDate = userDoki.user_doki.createdAt;
    // console.log('DOKI CREATED DATE:', new Date(dokiCreatedDate).toLocaleString('en-US'));
  }

  const totalSteps = useTotalStepCount(dokiCreatedDate, now);

  if (userDoki && user) {
    const { dailyStepGoal } = user;
    const hatchProgress = totalSteps / dailyStepGoal;

    return {
      hatchProgress,
      totalSteps,
      dailyStepGoal,
    };
  } else {
    return {};
  }
};
