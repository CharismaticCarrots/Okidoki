import AppleHealthKit from 'react-native-health';

import React, { useEffect, useState, useContext } from 'react';

const permissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.HeartRate,
      AppleHealthKit.Constants.Permissions.Height,
      AppleHealthKit.Constants.Permissions.Steps,
    ],
    write: [AppleHealthKit.Constants.Permissions.Steps],
  },
};

//context
export const HealthkitContext = React.createContext();

export const HealthKitProvider = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    AppleHealthKit.initHealthKit(permissions, (error) => {
      /* Called after we receive a response from the system */

      if (error) {
        console.log('[ERROR] Cannot grant permissions!');
      }
      setIsLoaded(true);
    });
  }, []);

  return (
    <HealthkitContext.Provider value={{ isLoaded, AppleHealthKit }}>
      {children}
    </HealthkitContext.Provider>
  );
};

//custom hooks
export const useHealthkit = () => {
  return useContext(HealthkitContext);
};

export const useStepCount = () => {
  const { isLoaded, AppleHealthKit } = useHealthkit();
  const [steps, setSteps] = useState(0);
  useEffect(() => {
    if (isLoaded) {
      AppleHealthKit.getStepCount(null, (err, results) => {
        if (err) {
          return;
        }
        setSteps(results.value);
      });
    }
  }, [isLoaded]);
  return steps;
};

export const useWeeklyStepCount = () => {
  const { isLoaded, AppleHealthKit } = useHealthkit();
  const [weekSteps, setWeekSteps] = useState(0);

  let options = {
    startDate: new Date('2022-07-04').toISOString(),
    endDate: new Date().toISOString(),
  };

  useEffect(() => {
    if (isLoaded) {
      AppleHealthKit.getDailyStepCountSamples(options, (err, results) => {
        if (err) {
          return;
        }

        setWeekSteps(results);
      });
    }
  }, [isLoaded]);
  return weekSteps;
};
