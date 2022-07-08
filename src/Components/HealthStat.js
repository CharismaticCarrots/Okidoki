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

import { StyledHeading2, StyledHeading1 } from './styles';
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
    <StyledHealthStatContainer style={styles.background}>
      <StyledHeading1>Health Stats</StyledHeading1>
      <View>
        <StyledHeading2>Steps</StyledHeading2>
        <BarChart
          data={data}
          width={Dimensions.get('window').width}
          height={300}
          formatYLabel={() => yLabelIterator.next().value}
          fromZero={true}
          chartConfig={{
            backgroundColor: '#DDBB67',
            backgroundGradientFrom: '#DDBB67',
            backgroundGradientTo: '#ad9250',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 8,
            },
            propsForBackgroundLines: {},
          }}
          style={{
            marginVertical: 8,
            borderRadius: 8,
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
  background: {
    backgroundColor: '#4FA4B8',
    height: '100%',
  },
});

export default HealthStat;
