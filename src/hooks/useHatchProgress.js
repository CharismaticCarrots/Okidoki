import { useUserData } from "./useUserData";
import { useTotalStepCount } from "../Healthkit";
import add from 'date-fns/add';

export const useHatchProgress = () => {
  // Dummy data for query to GET /api/user/doki createdDate
  const dokiCreatedDate = new Date().toISOString();;
  const sevenDaysLater = add(new Date(), {
    days: 7,
  }).toISOString();

  const totalSteps =  useTotalStepCount(dokiCreatedDate, sevenDaysLater);

  const user = useUserData();

  if (user) {
    const { dailyStepGoal } = user;
    const hatchProgress = totalSteps / dailyStepGoal;

    return { hatchProgress, totalSteps, dailyStepGoal };
  } else {
    return {};
  }
};
