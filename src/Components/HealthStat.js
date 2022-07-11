import React from 'react';
import {
  View,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  ScrollView,
  RefreshControl
} from 'react-native';
import { Text, Surface, Card, Avatar } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import { BarChart } from 'react-native-chart-kit';
import { StyledHeading2, StyledHeading1 } from './styles';
import Steps from './Steps';
import { useStepCountSamples, useFlightsClimbed, useDistance, useActiveEnergy, useDailyStepCount } from '../Healthkit';


import {
  StyledHealthStatContainer,
  StyledDayContainer,
  StyledInternalContainer,
} from './styles';

// const wait = (timeout) => {
//   return new Promise(resolve => setTimeout(resolve, timeout));
// }

const HealthStat = () => {
  // const [refreshing, setRefreshing] = React.useState(false);

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   wait(2000).then(() => setRefreshing(false));
  // }, []);


  const dailySteps = useStepCountSamples();
  const flights = `${useFlightsClimbed()} floors`
  const dailyDistance = `${useDistance()} miles`
  const activeEnergy = `${useActiveEnergy()} cal`
  const steps = `${useDailyStepCount()} steps`
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
    <ScrollView 
    // refreshControl={
    //   <RefreshControl
    //     refreshing={refreshing}
    //     onRefresh={onRefresh}
    //   />}
    >
    <StyledHealthStatContainer style={styles.background}>
      <StyledHeading1>Health Stats</StyledHeading1>
      <View>
        <StyledHeading2>Steps: Last 7 Days</StyledHeading2>
        <View >
          <BarChart
            data={data}
            width={350}
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
                borderRadius: 16,
                margin: 5,
                padding:5
            }}
          />
        </View>
      </View>
      <StyledHeading2>Today's Activity</StyledHeading2>
      <Card.Title
        style={styles.card}
        title={steps}
        subtitle="Step Count"
        left={() =>  <FontAwesome5 name={'shoe-prints'} style={styles.icons} />}
      />
      <Card.Title
        style={styles.card}
        title={dailyDistance}
        subtitle="Running / Walking Distance"
        left={() =>  <FontAwesome5 name={'running'} style={styles.icons} />}
      />
      <Card.Title
        style={styles.card}
        title={flights}
        subtitle="Flights Climbed"
        left={() =>  <MaterialCommunityIcons name='stairs' style={styles.icons} />}
      />
      <Card.Title
        style={styles.card}
        title={activeEnergy}
        subtitle="Active Calories Burned"
        left={() =>  <MaterialCommunityIcons name='fire' style={styles.icons} />}
      />
      
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
    </ScrollView>
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
  chart:{
    paddingRight:20,
    paddingLeft: 30,
    borderRadius: 16,
  },
  card: {
    backgroundColor: '#ffefb4',
    borderRadius: 10,
    padding:3,
    paddingLeft:20,
    marginVertical:10,
    marginHorizontal:20,
    fontFamily:"singularity"
  },
  icons:{
    padding: 5,
    fontSize:29,
    overflow:'hidden'
  }
});

export default HealthStat;
