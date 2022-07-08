import AppleHealthKit from 'react-native-health';
import subDays from 'date-fns/subDays';
import compareAsc from 'date-fns/compareAsc';
import parseISO from 'date-fns/parseISO';

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

export const useDailyStepCount = () => {
  const { isLoaded, AppleHealthKit } = useHealthkit();
  const [weekSteps, setWeekSteps] = useState(null);

  let options = {
    startDate: subDays(new Date(), 7).toISOString(),
  };

  useEffect(() => {
    if (isLoaded) {
      AppleHealthKit.getDailyStepCountSamples(options, (err, results) => {
        if (err) {
          return;
        }

        const reformattedWeekSteps = results.reduce((previous, day) => {
          const onlyDate = day.startDate.slice(0, 10);
          const findDate = previous.find(
            (dayObject) => dayObject.day === onlyDate
          );
          if (!findDate) {
            return [...previous, { day: onlyDate, value: day.value }];
          } else {
            findDate.value += day.value;

            return previous;
          }
        }, []);

        reformattedWeekSteps.sort((a, b) => {
          return compareAsc(parseISO(a.day), parseISO(b.day));
        });

        setWeekSteps(reformattedWeekSteps);
      });
    }
  }, [isLoaded]);
  return weekSteps;
};
