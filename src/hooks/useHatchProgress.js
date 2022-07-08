import { useStepCount } from "../Healthkit";
import { useDailyStepCount } from "../Healthkit";
import { useUserData } from "./useUserData";

export const useHatchProgress = () => {
  const weeklyStepCount = useStepCount(7);
  const trendWeeklyStepCount = useDailyStepCount();

  const { isLoading, isError, data: user, error } = useUserData();
  if (isError) console.log(error);
  if (!isLoading) {
    const hatchProgress = weeklyStepCount / user.dailyStepGoal;
    console.log("WEEKLY COUNT", weeklyStepCount);
    console.log("WEEKLY TREND", trendWeeklyStepCount.value);
    console.log("HATCH PROGRESS", hatchProgress);
    return hatchProgress;
  }
};
