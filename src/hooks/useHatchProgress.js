import { useUserData } from "./useUserData";
import { useTotalStepCount } from "../Healthkit";
import add from 'date-fns/add';

export const useHatchProgress = () => {
  debugger
  // Dummy data for query to GET /api/user/doki createdDate
  const dokiCreatedDate = new Date().toISOString();;
  const sevenDaysLater = add(new Date(), {
    days: 7,
  }).toISOString();
  debugger

  const totalSteps =  useTotalStepCount(dokiCreatedDate, sevenDaysLater);

  debugger
  const { isLoading, isError, data: user, error } = useUserData();

  debugger
  if (isError) console.log(error);

  if (!isLoading) {
    debugger
    const userGoal = user.dailyStepGoal;
    debugger
    const hatchProgress = totalSteps / userGoal;
    debugger
    const hatchProgressReturns = [ hatchProgress, totalSteps, userGoal ];
    debugger
    return hatchProgressReturns;
  }
};
