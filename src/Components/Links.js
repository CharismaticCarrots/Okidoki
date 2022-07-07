import { View, Button } from 'react-native';
import CarrotCount from './dokiHome/CarrotCount';

const Links = ({ navigation }) => {
  return (
    <View>
      <View>
        <Button
          title="Home"
          onPress={() => {
            navigation.navigate('Home');
          }}
        />
        <Button
          title="Sign Up"
          onPress={() => {
            navigation.navigate('SignUp');
          }}
        />
        <Button
          title="Set Goal"
          onPress={() => {
            navigation.navigate('SetGoal');
          }}
        />
        <Button
          title="DokiHome"
          onPress={() => {
            navigation.navigate('DokiHome');
          }}
        />
        <Button
          title="Select Egg"
          onPress={() => {
            navigation.navigate('SelectEgg')}}
        />
        <Button
        title="HealthStat"
        onPress={() => {
          navigation.navigate('HealthStat');
        }}
        />
        <CarrotCount />
      </View>
    </View>
  );
};

export default Links;
