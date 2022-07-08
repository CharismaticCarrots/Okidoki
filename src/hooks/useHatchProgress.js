import { useUserData } from "./useUserData";
import { useStepCountTrend, useTotalStepCount } from "../Healthkit";
import add from 'date-fns/add';

export const useHatchProgress = () => {
  // Dummy data for query to GET /api/user/doki createdDate
  const dokiCreatedDate = new Date().toISOString();;
  const sevenDaysLater = add(new Date(), {
    days: 7,
  }).toISOString();

  const [stepSamples, totalSteps] =  useStepCountTrend(dokiCreatedDate, sevenDaysLater);

  const { isLoading, isError, data: user, error } = useUserData();
  if (isError) console.log(error);
  if (!isLoading) {
    const hatchProgress = totalSteps / user.dailyStepGoal;
    return hatchProgress;
  }
};
