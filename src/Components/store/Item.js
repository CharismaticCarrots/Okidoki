import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image , TouchableOpacity} from 'react-native';
import axios from 'axios';
import { API_URL } from '../../../secrets';
import { Button } from 'react-native-paper';
import { useMutation } from 'react-query';
import { Popable, usePopable } from 'react-native-popable';
import * as SecureStore from 'expo-secure-store';
// import { StyledHeading1 } from '../styles';

const imageNames = {
  'video game': require('../../../assets/items/videogame.png'),
  slime: require('../../../assets/items/slime.png'),
  ball: require('../../../assets/items/ball.png'),
  'teddy bear': require('../../../assets/items/teddybear.png'),
};



const Item = (props) => {
  const { ref, hide, show } = usePopable();
  const [msgContent, setMsgContent] = useState(null);
  const curCarrotCount = props.carrotCount
  const price = props.price
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

  const purchaseItem = (itemId) => {
    if (curCarrotCount < price){
      show();
      setTimeout(() => hide(), 1000);
      setMsgContent('UH OH, YOU\'RE DON\'T HAVE ENOUGH CARROTS!');
    }
    else {
      const updatedCarrotCount = {
        carrotCount: curCarrotCount - price
      }
      userMutation.mutate(updatedCarrotCount)
      userItemMutation.mutate(itemId)
      console.log(curCarrotCount)
      show();
      setTimeout(() => hide(), 1000);
      setMsgContent(`${props.name.toUpperCase()} PURCHASED`);
    }
  }


  return (
    <TouchableOpacity
      onPress={() => purchaseItem(props.id)}
    >
    <View style={styles.item}>
      <Image style={styles.itemImg} source={imageNames[props.name]} />
      <Text style={styles.itemName}>{props.name}</Text>
      <Text style={styles.itemPrice}>{props.price}</Text>
      <Popable
          ref={ref}
          content={msgContent}
          style={styles.popoverStyles}
          animationType="spring"
          caret={false}
          backgroundColor='#59b2ff'
          height={50}
        >
        </Popable>
    </View>
    </TouchableOpacity>
  );
};

export default Item;

const styles = StyleSheet.create({
  item: {
    width: 110,
    height: 110,
    backgroundColor: '#ffefb4',
    borderRadius: 10,
    alignItems: 'center',
    margin: 10,
    padding: 10,
  },
  itemImg: {
    height: '60%',
    width: '60%',
    marginBottom: 5,
  },
  itemName: {
    fontFamily: 'Singularity',
    fontSize: 18,
    color: '#59b2ff',
    marginBottom: 2,
  },
  itemPrice: {
    fontFamily: 'Singularity',
    fontSize: 22,
    color: '#59b2ff',
  },
  popoverStyles: {
    alignSelf: "center",
    marginTop: 500,
    width: 200,
  }
});
