import { StyleSheet, View, ScrollView, ImageBackground, Dimensions } from 'react-native';
import { useUserItemData } from '../../hooks/useUserItemData';
import UserItem from '../dokiPack/UserItem';
import UserCarrots from '../dokiPack/UserCarrots';

const DokiDrawer = ({ curCarrotCount, curFullnessLvl, curMoodLvl }) => {
  const userItems = useUserItemData();

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
        nestedScrollEnabled={true}
      >
        <UserCarrots
          curCarrotCount={curCarrotCount}
          curFullnessLvl={curFullnessLvl}
        />
        {userItems &&
          userItems.map((item) => (
            <UserItem
              key={item.id}
              idNumber={item.id}
              name={item.name}
              quantity={item.user_item.quantity}
              curMoodLvl={curMoodLvl}
            />
          ))}
      </ScrollView>
      <ImageBackground
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
        source={require('../../../assets/backgrounds/dokiPack_background.png')}
      />
    </View>
  );
};

export default DokiDrawer;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 30,
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
  },
  popable: {
    alignSelf: 'center',
    marginTop: 350,
    width: 200,
  },
});
