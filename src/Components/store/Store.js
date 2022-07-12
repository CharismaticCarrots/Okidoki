import { StyleSheet, View, Text, Image } from 'react-native';
import { StyledDokiHomeBackground, StyledHeading1 } from '../styles';
import Item from './Item';

import axios from 'axios';
import { API_URL } from '../../../secrets.js';
import { useQuery } from 'react-query';

const fetchItemsData = async () => {
  const { data } = await axios.get(`http://${API_URL}/api/items`);
  return data;
};

export const useItemsData = () => {
  const {
    isLoading,
    isError,
    error,
    data: items,
  } = useQuery('items', fetchItemsData);

  if (isLoading) {
    console.log('LOADING');
  } else if (isError) {
    console.log('ERROR:', error);
  } else {
    return items;
  }
};

const Store = () => {
  const storeItems = useItemsData();
  console.log('store Items:', storeItems);

  let itemsList;
  if (storeItems) {
    itemsList = storeItems.map((item) => {
      return <Item key={item.id} name={item.name} price={item.price} />;
    });
  }

  return (
    <StyledDokiHomeBackground
      source={require('../../../assets/backgrounds/store.png')}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <StyledHeading1>Doki Plaza</StyledHeading1>
        <View style={styles.items}>{itemsList}</View>
      </View>
    </StyledDokiHomeBackground>
  );
};

export default Store;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 80,
    width: '80%',
  },
  items: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    // flex: 1,
  },
});
