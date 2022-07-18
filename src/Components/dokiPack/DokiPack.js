import { StyleSheet, View } from 'react-native';
import { useUserItemData } from '../../hooks/useUserItemData';
import { StyledHeading1, StyledDokiHomeBackground } from '../styles';
import UserItem from './UserItem';

const DokiPack = () => {
  const userItems = useUserItemData();
  let userItemList;
  if (userItems) {
    userItemList = userItems.map((item) => {
      return (
        <UserItem
          key={item.id}
          name={item.name}
          quantity={item.user_item.quantity}
        />
      );
    });
  }

  return (
    <StyledDokiHomeBackground
      source={require('../../../assets/backgrounds/selectEgg.png')}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <StyledHeading1>Doki Backpack</StyledHeading1>
        <View style={styles.box}>{userItemList}</View>
      </View>
    </StyledDokiHomeBackground>
  );
};

export default DokiPack;

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
  },
  box: {
    marginHorizontal: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
});
