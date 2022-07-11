import AppleHealthKit from 'react-native-health';
import subDays from 'date-fns/subDays';
import compareAsc from 'date-fns/compareAsc';
import parseISO from 'date-fns/parseISO';

import React, { useEffect, useState, useContext } from 'react';

const permissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
      AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
      AppleHealthKit.Constants.Permissions.FlightsClimbed,
      AppleHealthKit.Constants.Permissions.Steps,
    ]
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

const today = new Date().toISOString();

export const useDailyStepCount = (date = today) => {
  const { isLoaded, AppleHealthKit } = useHealthkit();
  const [steps, setSteps] = useState(0);

  const options = {
    date: date
  };

  useEffect(() => {
    if (isLoaded) {
      AppleHealthKit.getStepCount(options, (err, results) => {
        if (err) {
          return;
        }
        setSteps(results.value);
      });
    }
  }, [isLoaded]);
  return steps;
};

export const useStepCountSamples = () => {
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

export const useTotalStepCount = (startDate) => {
  const { isLoaded, AppleHealthKit } = useHealthkit();
  const [stepSamples, setStepSamples] = useState([]);
  const [totalSteps, setTotalSteps] = useState(0);

  const options = {
    startDate: startDate
  };

  useEffect(() => {
    if (isLoaded) {
      AppleHealthKit.getDailyStepCountSamples(options, (err, results) => {
        if (err) {
          return;
        }
        setStepSamples(results);
      });
    }
  }, [isLoaded, startDate]);

  useEffect(() => {
    const totalSteps = stepSamples.reduce((totalSteps, curSample) => totalSteps + curSample.value, 0);
    setTotalSteps(totalSteps);
  }, [stepSamples])

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
  }, [isLoaded]);
  return flights;
}


//get walking and running distance 
export const useDistance = () => {
  const { isLoaded, AppleHealthKit } = useHealthkit();
  const [distance, setDistance] = useState(0);
  let options = {
    unit: 'mile'
  }
  useEffect(() => {
    if (isLoaded) {
      AppleHealthKit.getDistanceWalkingRunning(options, (err, results) => {
        if (err) {
          return;
        }
        setDistance(results.value);
      });
    }
  }, [isLoaded]);
  return distance;
}

//get active energy burned  
export const useActiveEnergy = () => {
  const { isLoaded, AppleHealthKit } = useHealthkit();
  const [activeCal, setActiveCal] = useState(0);
  const today = new Date()
  
  let options = {
    startDate: subDays(new Date(), 1).toISOString(),
  }
  useEffect(() => {
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
        
        if(reformattedDailyEnergy[0]){setActiveCal(reformattedDailyEnergy[0].value)}
      });
    }
  }, [isLoaded]);

  return activeCal;
}
