import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Card, Provider ,Appbar ,Title,Paragraph , BottomNavigation} from 'react-native-paper';
import HealthStat from './HealthStat';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import SignUp from './createAccount/SignUp';
import SetGoal from './createAccount/SetGoal';
import DokiHome from './dokiHome/DokiHome';

const Tab = createMaterialBottomTabNavigator();

const Tabs = () => {


  return (
      <Tab.Navigator
        tabBarOptions = {{
          showLabel:false 
        }} 
      >
        <Tab.Screen name="Backpack" component={SignUp}/>
        <Tab.Screen name="Home" component={DokiHome}/>
        <Tab.Screen name="Health Data " component={HealthStat}/>
        <Tab.Screen name="Store" component={SetGoal}/>
      </Tab.Navigator>
  );
};

export default Tabs;