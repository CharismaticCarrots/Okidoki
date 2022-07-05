//temporary view component to house links to all the components to test rendering
//until the routes are set up correctly

import { Text, View, Button, StyleSheet } from 'react-native';

const Links = ({ navigation }) => {
  return (
    <View>
      <Text>Links</Text>
      <Text>Just a list of routes</Text>
      <View>
        <Button
          title="Home"
          onPress={() => {
            navigation.navigate('Home');
          }}
        />
        <Button
          title="Set Goal"
          onPress={() => {
            navigation.navigate('SetGoal');
          }}
        />
      </View>
    </View>
  );
};

export default Links;
