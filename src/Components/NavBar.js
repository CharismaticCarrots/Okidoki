import * as React from 'react';
import { View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons'
import DokiView from './dokiHome/DokiHome';
import HealthStat from './HealthStat';
import Store from './store/Store';
import UserSettings from './UserSettings';
import SettingsNavigator from './SettingsNavigator';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        lazy: false,
        tabBarOptions: {
          style: {
            backgroundColor: '#000',
          },
        },
        tabBarShowLabel: false,
        tabBarBackground: () => (<Image source={require('../../assets/backgrounds/navbar_background.png')}/>),
        tabBarStyle: [
          {
            display: "flex",
            paddingTop: 13,
            backgroundColor: '#59b2ff',
          },
          null,
        ],
        tabBarIcon: () => {
          switch (route.name) {
            case 'DokiHome':
              return (
                <FontAwesome5
                  name={'home'}
                  style={{fontSize: 32}}
                  color='#333'/>
              )
            case 'Health Data':
              return (
                <FontAwesome5
                name={'chart-bar'}
                style={{fontSize: 30}}
                color='#333'
              />
              )
            case 'Store':
              return (
                <FontAwesome5
                name={'store'}
                style={{fontSize: 30}}
                color='#333'
              />
              )
              case 'UserSettings':
                return (
                  <Ionicons
                    name={'ios-settings-sharp'}
                    style={{fontSize: 36}}
                    color='#333'
                  />
                );
            default:
              return <View />;
          }
        },
      })}
    >
      <Tab.Screen name="DokiHome" component={DokiView} />
      <Tab.Screen name="Health Data" component={HealthStat} />
      <Tab.Screen name="Store" component={Store} />
      <Tab.Screen name="UserSettings" component={SettingsNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;