import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Popable, usePopable } from 'react-native-popable';
import { StyledDokiHomeBackground, StyledHeading1 } from '../styles';
import Item from './Item';
import CountDisplay from '../dokiHome/CountDisplay';
import axios from 'axios';
import { API_URL } from '../../../secrets.js';
import { useQuery } from 'react-query';
import { useUserData } from '../../hooks/useUserData';
import { useMutation } from 'react-query';

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
  const [curCarrotCount, setCurCarrotCount] = useState(0);

  const { ref, hide, show } = usePopable();
  const [msgContent, setMsgContent] = useState(null);

  useEffect(() => {
    if (user) {
      setCurCarrotCount(user.carrotCount);
    }
  }, [user]);

  const userMutation = useMutation(async (userUpdate) => {
    const token = await SecureStore.getItemAsync('TOKEN');
    if (token) {
      const { data: updatedUser } = await axios.put(
        `http://${API_URL}/api/user/`,
        userUpdate,
        {
          headers: {
            authorization: token,
          },
        }
      );
      return updatedUser;
    }
  });

  const userItemMutation = useMutation(async (itemId) => {
    const token = await SecureStore.getItemAsync('TOKEN');
    if (token) {
      const { data: updatedUserItem } = await axios.post(
        `http://${API_URL}/api/user/items/${itemId}`,
        {},
        {
          headers: {
            authorization: token,
          },
        }
      );
      return updatedUserItem;
    }
  })

  console.log('CARROTCOUNT',curCarrotCount)

  const purchaseItem = (itemId, price) => {
    if (curCarrotCount >= price) {
      const updatedCarrotCount = {
        carrotCount: curCarrotCount - price
      }
      userMutation.mutate(updatedCarrotCount,
        {
          onSuccess: ({carrotCount}) => {
            setCurCarrotCount(carrotCount)
          }
        })
      userItemMutation.mutate(itemId,
      {
        onSuccess: () => {
        show()
      setTimeout(() => hide(), 1000);
      setMsgContent(`ITEM PURCHASED`)
        }
      }
      )
    }
    else {
      console.log('NO CARROTS')
      show();
      setTimeout(() => hide(), 1300);
      setMsgContent('UH OH, YOU\'RE DON\'T HAVE ENOUGH CARROTS!');
    }
  }

  let itemsList;
  if (storeItems) {
    itemsList = storeItems.map((item) => {
      return <Item key={item.id} name={item.name} price={item.price} id={item.id} carrotCount={curCarrotCount} purchaseItem={purchaseItem}/>;
    });
  }

  

  useEffect(() => {
    if (user) {
      setCurCarrotCount(user.carrotCount);
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
        <Popable
          ref={ref}
          content={msgContent}
          style={styles.popoverStyles}
          animationType="spring"
          caret={false}
          backgroundColor='#59b2ff'
        >
        </Popable>
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
  popoverStyles: {
    alignSelf: "center",
    marginTop: 450,
    width: 200,
  }
});
