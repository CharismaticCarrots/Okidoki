import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image , TouchableOpacity} from 'react-native';



const imageNames = {
  'video game': require('../../../assets/items/videogame.png'),
  slime: require('../../../assets/items/slime.png'),
  ball: require('../../../assets/items/ball.png'),
  'teddy bear': require('../../../assets/items/teddybear.png'),
};



const Item = (props) => {
  console.log('PROPS', props)
  const purchaseItem = props.purchaseItem
  

  return (
    <TouchableOpacity
      onPress={() => purchaseItem(props.id, props.price)}
    >
    <View style={styles.item}>
      <Image style={styles.itemImg} source={imageNames[props.name]} />
      <Text style={styles.itemName}>{props.name}</Text>
      <Text style={styles.itemPrice}>{props.price}</Text>
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
  }
});


// const { ref, hide, show } = usePopable();
//   const [msgContent, setMsgContent] = useState(null);

  // const price = props.price
  // const { user } = useUserData();
  // const [curCarrotCount, setCurCarrotCount] = useState(0);
  // useEffect(() => {
  //   if (user) {
  //     setCurCarrotCount(user.carrotCount);
  //   }
  // }, [user]);

  // const userMutation = useMutation(async (userUpdate) => {
  //   const token = await SecureStore.getItemAsync('TOKEN');
  //   if (token) {
  //     const { data: updatedUser } = await axios.put(
  //       `http://${API_URL}/api/user/`,
  //       userUpdate,
  //       {
  //         headers: {
  //           authorization: token,
  //         },
  //       }
  //     );
  //     return updatedUser;
  //   }
  // });

  // const userItemMutation = useMutation(async (itemId) => {
  //   const token = await SecureStore.getItemAsync('TOKEN');
  //   if (token) {
  //     const { data: updatedUserItem } = await axios.post(
  //       `http://${API_URL}/api/user/items/${itemId}`,
  //       {},
  //       {
  //         headers: {
  //           authorization: token,
  //         },
  //       }
  //     );
  //     return updatedUserItem;
  //   }
  // })

  // console.log('CARROTCOUNT',curCarrotCount)

  // const purchaseItem = (itemId) => {
  //   if (curCarrotCount >= price) {
  //     const updatedCarrotCount = {
  //       carrotCount: curCarrotCount - price
  //     }
  //     userMutation.mutate(updatedCarrotCount,
  //       {
  //         onSuccess: ({carrotCount}) => {
  //           setCurCarrotCount(carrotCount)
  //         }
  //       })
  //     userItemMutation.mutate(itemId,
  //     {
  //       onSuccess: () => {
  //       show()
  //     setTimeout(() => hide(), 1000);
  //     setMsgContent(`${props.name.toUpperCase()} PURCHASED`)
  //       }
  //     }
  //     )
  //   }
  //   else {
  //     show();
  //     setTimeout(() => hide(), 1300);
  //     setMsgContent('UH OH, YOU\'RE DON\'T HAVE ENOUGH CARROTS!');
  //   }
  // }
