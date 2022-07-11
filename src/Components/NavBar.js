import * as React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Card, Provider ,Appbar ,Title,Paragraph , BottomNavigation} from 'react-native-paper';
import HealthStat from './HealthStat';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import SignIn from './signIn/SignIn';
import SetGoal from './signUp/SetGoal';
import DokiView from './dokiHome/DokiHome';
import Logout from './signIn/Logout';
import { LogOutNavigator } from '../navigation';
const Tab = createBottomTabNavigator();

const TabNavigator = () => {


  return (
      <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: '#45A0DA',
        },
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
            backgroundColor: '#45A0DA',
          
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
            case 'Logout':
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
        <Tab.Screen name="Logout" 
        //  children={() => {
        //   <LogOutNavigator/>
        // }}
        component={LogOutNavigator}
        options={{ tabBarLabel: 'Logout' }}
        />
        <Tab.Screen name="HEALTH DATA" component={HealthStat}/>
        <Tab.Screen name="SetGoal" component={SetGoal}/>
      </Tab.Navigator>
  );
};

export default TabNavigator;