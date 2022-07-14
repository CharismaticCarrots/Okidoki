import {
  View,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';
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

import * as SecureStore from 'expo-secure-store';
import { useUserData } from '../hooks/useUserData';

const HealthStat = () => {
  const { user, logout } = useUserData();
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
          <StyledHeading2>Steps: Last 7 Days</StyledHeading2>
          <View>
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
                padding: 5,
              }}
            />
          </View>
        </View>

        <StyledHeading2>Today&apos;s Activity</StyledHeading2>
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
          <Button
            onPress={() => {
              logout();
              SecureStore.deleteItemAsync('TOKEN');
              // navigation.navigate('LoginOptions');
            }}
          >
            LOGOUT
          </Button>
        </ScrollView>
      </StyledHealthStatContainer>
    </StyledDokiHomeBackground>
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
  chart: {
    paddingRight: 20,
    paddingLeft: 30,
    borderRadius: 16,
  },
  card: {
    backgroundColor: '#ffefb4',
    borderRadius: 10,
    padding: 3,
    paddingLeft: 20,
    marginVertical: 10,
    marginHorizontal: 40,
    fontFamily: 'singularity',
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
