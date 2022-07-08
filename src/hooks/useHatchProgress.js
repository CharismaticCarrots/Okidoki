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

  const { isLoading, isError, data: user, error } = useUserData();
  if (isError) console.log(error);

  if (!isLoading) {
    const hatchProgress = totalSteps / user.dailyStepGoal;
    console.log("HATCH PROGRESS", user.firstName, totalSteps, user.dailyStepGoal)
    return hatchProgress;
  }
};
