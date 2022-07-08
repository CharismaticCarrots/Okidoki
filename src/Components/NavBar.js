import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Card, Provider ,Appbar ,Title,Paragraph , BottomNavigation} from 'react-native-paper';
import HealthStat from './HealthStat';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import SignUp from './createAccount/SignUp';
import SetGoal from './createAccount/SetGoal';
import DokiHome from './dokiHome/DokiHome';

const Tab = createBottomTabNavigator();

const Tabs = () => {


  return (
      <Tab.Navigator
        screenOptions = {{
          showLabel:false,
          tabBarStyle: { position: 'absolute' },
          // headerShown: false,
         
        }} 
      >
        <Tab.Screen name="HOME" component={DokiHome}/>
        <Tab.Screen name="Backpack" component={SignUp}/>
        <Tab.Screen name="Health Data " component={HealthStat}/>
        <Tab.Screen name="Store" component={SetGoal}/>
      </Tab.Navigator>
  );
};

export default Tabs;