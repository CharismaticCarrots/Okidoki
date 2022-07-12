import { View, Button } from 'react-native';

const Links = ({ navigation }) => {
  return (
    <View>
      <View>
      <Button
          title="Doki Pack"
          onPress={() => {
            navigation.navigate('DokiPack');
          }}
        />
        <Button
          title="Home"
          onPress={() => {
            navigation.navigate('Home');
          }}
        />
        <Button
          title="LoginOptions"
          onPress={() => {
            navigation.navigate('LoginOptions');
          }}
        />
        {/* <Button
          title="Sign Up"
          onPress={() => {
            navigation.navigate('SignUp');
          }}
        />
        <Button
          title="Sign In"
          onPress={() => {
            navigation.navigate('SignIn');
          }}
        /> */}
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
          title="DokiView"
          onPress={() => {
            navigation.navigate('DokiView');
          }}
        />
        <Button
          title="Select Egg"
          onPress={() => {
            navigation.navigate('SelectEgg');
          }}
        />
        <Button
          title="HealthStat"
          onPress={() => {
            navigation.navigate('HealthStat');
          }}
        />
        <Button
          title="Logout"
          onPress={() => {
            navigation.navigate('Logout');
          }}
        />
      </View>
    </View>
  );
};

export default Links;
