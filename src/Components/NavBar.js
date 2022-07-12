import * as React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import HealthStat from './HealthStat';
import SignIn from './signIn/SignIn';
import SetGoal from './signUp/SetGoal';
import DokiView from './dokiHome/DokiHome';
import { LogOutNavigator } from '../Logout Navigator';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
      <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarOptions: {
          style: {
              backgroundColor: '#000',
          }},
        tabBarShowLabel: false,
        tabBarBackground: () => (<Image source={require('../../assets/backgrounds/navbar_background.png')}/>),
        tabBarStyle: [
          {
            display: "flex",
            paddingTop: 13,
            backgroundColor: '#59b2ff',
          },
          null
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
            case 'User Settings':
              return (
                <FontAwesome5
                  name={'shopping-bag'}
                  style={{fontSize: 30}}
                  color='#333'
                />
              )
            case 'HEALTH DATA':
              return (
                <FontAwesome5
                name={'chart-bar'}
                style={{fontSize: 30}}
                color='#333'
              />
              )
            case 'SetGoal':
              return (
                <FontAwesome5
                name={'store'}
                style={{fontSize: 30}}
                color='#333'
              />
              )
            default:
              return <View />
          }
        },
      })}
      >
        <Tab.Screen name="DokiHome" component={DokiView}/>
        <Tab.Screen name="User Settings" component={LogOutNavigator}/>
        <Tab.Screen name="HEALTH DATA" component={HealthStat}/>
        <Tab.Screen name="SetGoal" component={SetGoal}/>
      </Tab.Navigator>
  );
};

export default TabNavigator;
