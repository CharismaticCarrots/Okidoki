import UserItem from '../dokiPack/UserItem';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import {
  StyledItemContainer,
  StyledItemImage,
  StyledItemQuantity,
  StyledItemQuantityText,
} from '../styles';
import { useUserItemData } from '../../hooks/useUserItemData';

import { Popable, usePopable } from 'react-native-popable';

const DokiDrawer = (props) => {
  const { ref, hide, show } = usePopable();

  console.log('PROPS INSIDE DOKI DRAWER', props);

  const handleFeed = () => {
    props.feedDoki();
    show();
    setTimeout(() => hide(), 700);
  };

  const handlePlay = () => {
    props.playWithDoki();
    show();
    setTimeout(() => hide(), 700);
  };

  const userItems = useUserItemData();
  let userItemList;
  if (userItems) {
    userItemList = userItems.map((item) => {
      return (
        <UserItem
          handlePlay={handlePlay}
          key={item.id}
          name={item.name}
          quantity={item.user_item.quantity}
        />
      );
    });
  }
  // console.log('PROPS INSIDE DOKI DRAWER', props);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
        nestedScrollEnabled={true}
      >
        {/* Carrot */}
        <TouchableOpacity onPress={handleFeed}>
          <StyledItemContainer>
            <StyledItemImage
              source={require('../../../assets/items/carrot.png')}
            />

            <StyledItemQuantity>
              <StyledItemQuantityText>
                {props.carrotCount}
              </StyledItemQuantityText>
            </StyledItemQuantity>
          </StyledItemContainer>
        </TouchableOpacity>
        {/* All Items */}
        {userItemList}
      </ScrollView>
      <Popable
        ref={ref}
        content={props.msgContent}
        style={styles.popable}
        animationType="spring"
      ></Popable>
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
