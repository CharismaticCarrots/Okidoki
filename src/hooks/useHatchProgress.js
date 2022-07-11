import { useUserData } from "./useUserData";
import { useTotalStepCount } from "../Healthkit";
import { useUserDokiData } from "./useUserDokiData";

export const useHatchProgress = () => {
  const userDoki = useUserDokiData();
  const user = useUserData();

  let dokiCreatedDate = null;

  if (userDoki) {
    dokiCreatedDate = userDoki.user_doki.createdAt;
    console.log("DOKI CREATED DATE", dokiCreatedDate)
  }

  const totalSteps = useTotalStepCount(dokiCreatedDate);

  if (userDoki && user) {
    const { dailyStepGoal } = user;
    const hatchProgress = totalSteps / dailyStepGoal;

    return {
      hatchProgress,
      totalSteps,
      dailyStepGoal
    };
  } else {
    return {};
  }
};
