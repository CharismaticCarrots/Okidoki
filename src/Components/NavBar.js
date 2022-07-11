import * as React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import HealthStat from './HealthStat';
import SignIn from './signIn/SignIn';
import SetGoal from './signUp/SetGoal';
import DokiView from './dokiHome/DokiHome';
import Logout from './signIn/Logout';
import LoginOptions from './LoginOptions'


const Stack = createNativeStackNavigator()

export const LogOutNavigator = ({navigation}) => {
  return (
    <Stack.Navigator headerMode="screen" >
      <Stack.Screen
        name="Logout"
        component={Logout}
        options={{ tabBarLabel: 'Logout Screen' }}
      />
      <Stack.Screen
        name="LoginOptions"
        headerShown = 'false'
        component={LoginOptions}
      />
      <Stack.Screen
        name="SignIn"
        headerShown = 'false'
        component={SignIn}
      />
    </Stack.Navigator>
  )
}

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
        tabBarStyle: [
          {
            display: "flex",
            paddingTop:13,
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