import {
  View,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, { useContext} from 'react'
import { Button, Card } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import { BarChart } from 'react-native-chart-kit';

import {
  StyledHeading2,
  StyledHealthStatHeading,
  StyledHealthStatContainer,
  StyledDokiHomeBackground,
} from './styles';

import {
  useStepCountSamples,
  useFlightsClimbed,
  useDistance,
  useActiveEnergy,
  useDailyStepCount,
} from '../Healthkit';


const HealthStat = () => {
  const dailySteps = useStepCountSamples();
  const flights = useFlightsClimbed();
  const dailyDistance = useDistance();
  const activeEnergy = useActiveEnergy();
  const steps = useDailyStepCount();

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
    <StyledDokiHomeBackground
      source={require('../../assets/backgrounds/healthStats.png')}
      resizeMode="cover"
    >
      <StyledHealthStatContainer style={styles.background}>
        <StyledHealthStatHeading>Health Stats</StyledHealthStatHeading>
        <View>
          <StyledHeading2>Steps Trend: Last 7 Days</StyledHeading2>
          <View
            >
            <BarChart
              data={data}
              width={350}
              height={300}
              fromZero={true}
              showValuesOnTopOfBars={true}
              showBarTops={true}
              chartConfig={{
                backgroundGradientFrom: 'white',
                backgroundGradientTo: 'white',
                fillShadowGradientFrom: '#91DEA6',
                fillShadowGradientTo: '#598866',
                fillShadowGradientFromOpacity: 1,
                fillShadowGradientToOpacity: 1,
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(5, 5, 5, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(5, 5, 5, ${opacity})`,
                barPercentage: 0.8,
                propsForLabels: {
                  fontSize: '12',
                  fontWeight: 'bold',
                  fontFamily: 'FredokaOne'
                },
              }}
              style={{
                borderRadius: 12,
                fontFamily: 'FredokaOne',
                borderColor: '#333',
                borderWidth: 3,
                paddingTop: 20,
                backgroundColor: 'white',
              }}
            />
          </View>
        </View>

        <StyledHeading2
          style={{marginTop: 30}}
        >Today&apos;s Activity</StyledHeading2>
        <ScrollView style={styles.scrollView}>
          <Card.Title
            style={styles.card}
            title={steps}
            subtitle="Step Count"
            left={() => (
              <FontAwesome5 name={'shoe-prints'} style={styles.icons} />
            )}
          />
          <Card.Title
            style={styles.card}
            title={dailyDistance}
            subtitle="Running / Walking Distance"
            left={() => <FontAwesome5 name={'running'} style={styles.icons} />}
          />
          <Card.Title
            style={styles.card}
            title={flights}
            subtitle="Flights Climbed"
            left={() => (
              <MaterialCommunityIcons name="stairs" style={styles.icons} />
            )}
          />
          <Card.Title
            style={styles.card}
            title={activeEnergy}
            subtitle="Active Calories Burned"
            left={() => (
              <MaterialCommunityIcons name="fire" style={styles.icons} />
            )}
          />
        </ScrollView>
      </StyledHealthStatContainer>
    </StyledDokiHomeBackground>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffefb4',
    borderRadius: 10,
    padding: 3,
    paddingLeft: 20,
    marginVertical: 10,
    marginHorizontal: 40,
    fontFamily: 'singularity',
    fontSize: 20,
    borderColor: '#333',
    borderWidth: 3,
  },
  icons: {
    padding: 5,
    fontSize: 27,
    overflow: 'hidden',
  },
  scrollView: {
    width: '100%',
  },
});

export default HealthStat;
