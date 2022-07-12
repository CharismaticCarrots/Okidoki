import { Text, View, Button, ActivityIndicator } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import { useUserData } from '../../hooks/useUserData';

const Logout = ({ navigation }) => {
  const { user, logout } = useUserData();
  if (!user) {
    return <ActivityIndicator size="large" />;
  }
  return (
    <View style={{margin:100}}>
      <Button
        title="logout"
        onPress={() => {
          logout();
          SecureStore.deleteItemAsync('TOKEN');
          navigation.navigate('LoginOptions');
        }}
      />
    </View>
  );
};

export default Logout;
