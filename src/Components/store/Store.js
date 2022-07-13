import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { StyledDokiHomeBackground, StyledHeading1 } from '../styles';
import Item from './Item';
import CountDisplay from '../dokiHome/CountDisplay';
import axios from 'axios';
import { API_URL } from '../../../secrets.js';
import { useQuery } from 'react-query';
import { useUserData } from '../../hooks/useUserData';

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
  const { user } = useUserData();
  const storeItems = useItemsData();
  console.log('store Items:', storeItems);

  const [curCarrotCount, setCurCarrotCount] = useState(0);

  let itemsList;
  if (storeItems) {
    itemsList = storeItems.map((item) => {
      return <Item key={item.id} name={item.name} price={item.price} id={item.id} carrotCount={curCarrotCount}/>;
    });
  }

  useEffect(() => {
    if (user) {
      setCurCarrotCount(user.carrotCount);
      console.log('USERRR', user)
    }
  }, [user]);

  return (
    <StyledDokiHomeBackground
      source={require('../../../assets/backgrounds/store.png')}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <StyledHeading1>Doki Mart</StyledHeading1>
        <View style={styles.items}>{itemsList}</View>
        <CountDisplay
          style={{ marginTop: 400}}
          counterType={'carrot'}
          count={curCarrotCount}
        />
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
    height: '100%',
  },
  items: {
    // height: '100%',
    marginTop: 60,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
});
