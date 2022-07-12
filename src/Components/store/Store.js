import { StyleSheet, View, Text, Image } from 'react-native';
import { StyledDokiHomeBackground, StyledHeading1 } from '../styles';
import Item from './Item';

const Store = () => {
  const storeItems = useItemsData();
  console.log('store Items:', storeItems);

  return (
    <StyledDokiHomeBackground
      source={require('../../../assets/backgrounds/loginOptions.png')}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <StyledHeading1>Store</StyledHeading1>

        <View style={styles.items}>
          <Item name="ball" price={5} />
          <Item name="ball" price={5} />
          <Item name="ball" price={5} />
          <Item name="ball" price={5} />
          <Item name="ball" price={5} />
        </View>
      </View>
    </StyledDokiHomeBackground>
  );
};

export default Store;

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    // justifyContent: 'space-around',
    marginTop: 80,
  },
  items: {
    flexDirection: 'row',
  },
});
