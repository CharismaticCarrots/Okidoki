import { useUserData } from './useUserData';
import { useTotalStepCount } from '../Healthkit';
import add from 'date-fns/add';

export const useHatchProgress = (now) => {
  // Dummy data for query to GET /api/user/doki createdDate
  const dokiCreatedDate = new Date('2022-07-10').toISOString();
  // const sevenDaysLater = add(new Date(), {
  //   days: 7,
  // }).toISOString();
  console.log({ now });
  const totalSteps = useTotalStepCount(dokiCreatedDate, now);

  const { user } = useUserData();

  if (user) {
    const { dailyStepGoal } = user;
    const hatchProgress = totalSteps / dailyStepGoal;

    return { hatchProgress, totalSteps, dailyStepGoal };
  } else {
    return {};
  }
};
