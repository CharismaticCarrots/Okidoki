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
import { useStepsTrend } from '../Healthkit';

import {
  StyledHealthStatContainer,
  StyledDayContainer,
  StyledInternalContainer,
} from './styles';

const HealthStat = () => {
  const dailySteps = useStepsTrend();

  if (!dailySteps) {
    return <ActivityIndicator size="large" />;
  }

  let data = {
    labels: dailySteps.map((day) => format(parseISO(day.day), 'eeeeee')),
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
        <StyledHeading2>Steps: Last 7 Days</StyledHeading2>
        <View>
          <BarChart
            data={data}
            width={Dimensions.get('screen').width}
            height={250}
            fromZero={true}
            showValuesOnTopOfBars={true}
            chartConfig={{
              backgroundColor: '#4fa4b8',
              backgroundGradientFrom: '#397887',
              backgroundGradientTo: '#397887',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(5, 5, 5, ${opacity})`,
              barPercentage: 0.7,
              propsForLabels: {
                fontSize: '13',
                fontWeight: 'bold',
              },
            }}
            style={{
              marginVertical: 8,
            }}
          />
        </View>
      </View>
      <StyledHeading2>History</StyledHeading2>
      <Text>More to come in Tier 2...</Text>
      {/* <ScrollView>
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
      </ScrollView> */}
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
