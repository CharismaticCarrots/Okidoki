import AppleHealthKit from 'react-native-health';
import subDays from 'date-fns/subDays';
import compareAsc from 'date-fns/compareAsc';
import parseISO from 'date-fns/parseISO';

import React, { useEffect, useState, useContext } from 'react';
import { startOfDay } from 'date-fns';

const permissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
      AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
      AppleHealthKit.Constants.Permissions.FlightsClimbed,
      AppleHealthKit.Constants.Permissions.Steps,
    ],
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

export const useDailyStepCount = (startDate) => {
  const { isLoaded, AppleHealthKit } = useHealthkit();
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    const options = {
      startDate: startDate,
    };
    if (isLoaded) {
      AppleHealthKit.getStepCount(options, (err, results) => {
        if (err) {
          return;
        }
        setSteps(results.value);
      });
    }
  }, [AppleHealthKit, isLoaded, startDate]);
  return steps;
};

export const useStepCountSamples = () => {
  const { isLoaded, AppleHealthKit } = useHealthkit();
  const [weekSteps, setWeekSteps] = useState(null);

  useEffect(() => {
    let options = {
      startDate: subDays(new Date(), 7).toISOString(),
    };

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
  }, [AppleHealthKit, isLoaded]);
  return weekSteps;
};

export const useTotalStepCount = (startDate, endDate) => {
  const { isLoaded, AppleHealthKit } = useHealthkit();
  const [totalSteps, setTotalSteps] = useState(0);

  useEffect(() => {
    const options = {
      startDate: startDate,
      endDate: endDate,
    };

    if (isLoaded) {
      AppleHealthKit.getDailyStepCountSamples(options, (err, results) => {
        if (err) {
          return;
        }

        const totalSteps = results.reduce(
          (totalSteps, curSample) => totalSteps + curSample.value,
          0
        );
        setTotalSteps(totalSteps);
      });
    }
  }, [isLoaded, startDate, endDate, AppleHealthKit]);

  return totalSteps;
};

//get flights climbed
export const useFlightsClimbed = () => {
  const { isLoaded, AppleHealthKit } = useHealthkit();
  const [flights, setFlights] = useState(0);
  useEffect(() => {
    if (isLoaded) {
      AppleHealthKit.getFlightsClimbed(null, (err, results) => {
        if (err) {
          return;
        }
        setFlights(results.value);
      });
    }
  }, [AppleHealthKit, isLoaded]);
  return flights;
};

//get walking and running distance
export const useDistance = () => {
  const { isLoaded, AppleHealthKit } = useHealthkit();
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    let options = {
      unit: 'mile',
    };

    if (isLoaded) {
      AppleHealthKit.getDistanceWalkingRunning(options, (err, results) => {
        if (err) {
          return;
        }
        setDistance(results.value);
      });
    }
  }, [AppleHealthKit, isLoaded]);
  return distance;
};

//get active energy burned
export const useActiveEnergy = () => {
  const { isLoaded, AppleHealthKit } = useHealthkit();
  const [activeCal, setActiveCal] = useState(0);
  const today = startOfDay(new Date()).toISOString();

  useEffect(() => {
    let options = {
      startDate: today,
    };

    if (isLoaded) {
      AppleHealthKit.getActiveEnergyBurned(options, (err, results) => {
        if (err) {
          return;
        }
        const reformattedDailyEnergy = results.reduce((previous, day) => {
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

        if (reformattedDailyEnergy[0]) {
          setActiveCal(reformattedDailyEnergy[0].value);
        }
      });
    }
  }, [AppleHealthKit, isLoaded, today]);

  return activeCal;
};
