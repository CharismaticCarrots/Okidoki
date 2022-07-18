import { StyleSheet, View, ScrollView } from 'react-native';
import { useUserItemData } from '../../hooks/useUserItemData';
import UserItem from '../dokiPack/UserItem';
import UserCarrots from '../dokiPack/UserCarrots';

const DokiDrawer = ({ curCarrotCount, curFullnessLvl, curMoodLvl }) => {
  const userItems = useUserItemData();
  console.log('userItems inside dokidrawer', userItems);

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
              price={item.price}
              quantity={item.user_item.quantity}
              curMoodLvl={curMoodLvl}
            />
          ))}
      </ScrollView>
    </View>
  );
};

export default DokiDrawer;

const styles = StyleSheet.create({
  container: {
    marginLeft: 30,
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
