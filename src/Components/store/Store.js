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
