import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import { BarChart } from 'react-native-chart-kit';

import Steps from './Steps';
import { useDailyStepCount } from '../Healthkit';

const HealthStat = () => {
  const dailySteps = useDailyStepCount();

  if (!dailySteps) {
    return <ActivityIndicator size="large" />;
  }
  return (
    <View style={styles.container}>
      <View>
        <Text>Bezier Line Chart</Text>
        <BarChart
          data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
            ],
          }}
          width={Dimensions.get('window').width} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
      {/* <View>
        {dailySteps.map((day) => {
          return (
            <View>
              <Text>Day: {format(parseISO(day.startDate), 'eeeeee')}</Text>
              <Text>Steps: {day.value}</Text>
            </View>
          );
        })}
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

export default HealthStat;
