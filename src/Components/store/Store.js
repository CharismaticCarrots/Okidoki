import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Popable, usePopable } from 'react-native-popable';
import axios from 'axios';
import { API_URL } from '../../../secrets.js';
import { useQuery } from 'react-query';
import { useUserData } from '../../hooks/useUserData';
import { useMutation } from 'react-query';
import { StyledDokiHomeBackground, StyledHeading1 } from '../styles';
import Item from './Item';
import CountDisplay from '../dokiHome/CountDisplay';

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
  const { ref, hide, show } = usePopable();
  const [msgContent, setMsgContent] = useState(null);

  const { user } = useUserData();
  const storeItems = useItemsData();
  const [curCarrotCount, setCurCarrotCount] = useState(0);

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
      const { data: updatedUserItem } = await axios.put(
        `http://${API_URL}/api/user/items/${itemId}`,
        {
          quantity: 1,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      return updatedUserItem;
    }
  });

  const purchaseItem = (itemId, price) => {
    if (curCarrotCount >= price) {
      const updatedCarrotCount = {
        carrotCount: curCarrotCount - price,
      };
      userMutation.mutate(updatedCarrotCount, {
        onSuccess: ({ carrotCount }) => {
          setCurCarrotCount(carrotCount);
        },
      });
      userItemMutation.mutate(itemId, {
        onSuccess: () => {
          show();
          setTimeout(() => hide(), 1000);
          setMsgContent('ITEM PURCHASED');
        },
      });
    } else {
      show();
      setTimeout(() => hide(), 1300);

      setMsgContent("UH OH, YOU DON'T HAVE ENOUGH CARROTS!");
    }
  };

  let itemsList;
  if (storeItems) {
    itemsList = storeItems.map((item) => {
      return (
        <Item
          key={item.id}
          name={item.name}
          price={item.price}
          id={item.id}
          carrotCount={curCarrotCount}
          purchaseItem={purchaseItem}
        />
      );
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
        <StyledHeading1 style={{ marginBottom: 2 }}>Doki Mart</StyledHeading1>
        <View style={styles.countDisplay}>
          <CountDisplay counterType={'carrot'} count={curCarrotCount} />
        </View>
        <View style={styles.items}>{itemsList}</View>
        <Popable
          ref={ref}
          content={msgContent}
          style={styles.popoverStyles}
          animationType="spring"
          caret={false}
          backgroundColor="#59b2ff"
        ></Popable>
      </View>
    </StyledDokiHomeBackground>
  );
};

export default Store;

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    alignItems: 'center',
  },
  countDisplay: {
    marginBottom: 40,
  },
  items: {
    marginHorizontal: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  popoverStyles: {
    alignSelf: 'center',
    marginTop: 450,
    width: 200,
  },
});
