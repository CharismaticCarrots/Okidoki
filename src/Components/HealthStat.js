import React from 'react';
import {
  View,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Text, Surface } from 'react-native-paper';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import { BarChart } from 'react-native-chart-kit';

import Steps from './Steps';
import { useDailyStepCount } from '../Healthkit';

import {
  StyledHealthStatContainer,
  StyledDayContainer,
  StyledInternalContainer,
} from './styles';

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
      <Text>Steps</Text>
      <View>
        <Text>Current Week:</Text>
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
      <Text>History</Text>
      <ScrollView>
        {dailySteps.map((day) => {
          return (
            <StyledDayContainer>
              <Surface style={styles.surface} elevation={4}>
                <StyledInternalContainer>
                  <Text>{format(parseISO(day.startDate), 'eeee')}: </Text>

                  <Text>{day.value} Steps</Text>
                </StyledInternalContainer>
              </Surface>
            </StyledDayContainer>
          );
        })}
      </ScrollView>
    </StyledHealthStatContainer>
  );
};

const styles = StyleSheet.create({
  surface: {
    padding: 8,
    height: 80,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
});

export default HealthStat;
