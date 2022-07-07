// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { BottomNavigation, Text } from 'react-native-paper';


// const NavBar = () => {
//   const Home = () => <Text>Home</Text>;

// const Backpack = () => <Text>Backpack</Text>;

// const HealthData = () => <Text>Health Data</Text>;

// const DokiStore = () => <Text>Store</Text>;
//   return (
//     <View>
//       <Text>NavBar</Text>
//     </View>
//   )
// }

// export default NavBar

// const styles = StyleSheet.create({})


import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

const MusicRoute = () => <Text>Music</Text>;

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

const NavBar = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'music', title: 'Favorites', focusedIcon: 'heart', unfocusedIcon: 'heart-outline'},
    { key: 'albums', title: 'Albums', focusedIcon: 'album' },
    { key: 'recents', title: 'Recents', focusedIcon: 'history' },
    { key: 'notifications', title: 'Notifications', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default Navbar;