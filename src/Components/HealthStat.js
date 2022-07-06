import React from 'react';
import { View, ActivityIndicator, Dimensions } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import { BarChart } from 'react-native-chart-kit';

import Steps from './Steps';
import { useDailyStepCount } from '../Healthkit';

import { StyledHealthStatContainer } from './styles';

const HealthStat = () => {
  const dailySteps = useDailyStepCount();

  if (!dailySteps) {
    return <ActivityIndicator size="large" />;
  }

  let data = {
    labels: dailySteps.map((day) => format(parseISO(day.startDate), 'eeeeee')),
    datasets: [
      {
        data: dailySteps.map((day) => day.value),
      },
    ],
  };

  return (
    <StyledHealthStatContainer>
      <Text variant="displayLarge">Steps</Text>
      <View>
        <Text variant="displayMedium">Current Week:</Text>
        <BarChart
          data={data}
          width={Dimensions.get('window').width} // from react-native
          height={300}
          // yAxisSuffix="k"
          // yAxisInterval={1} // optional, defaults to 1
          formatYLabel={() => yLabelIterator.next().value}
          fromZero={true}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 0, // optional, defaults to 2dp
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
    </StyledHealthStatContainer>
  );
};

export default HealthStat;
