import { useUserData } from '../hooks/useUserData';
import { useTotalStepCount } from '../Healthkit';
import { useUserDokiData } from '../hooks/useUserDokiData';

export const getHatchProgress = (now) => {
  const userDoki = useUserDokiData();
  const { user } = useUserData();

  let dokiCreatedDate = null;

  if (userDoki) {
    dokiCreatedDate = userDoki.user_doki.createdAt;
    console.log('DOKI CREATED DATE', dokiCreatedDate);
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
