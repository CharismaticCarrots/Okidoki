import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Popable, usePopable } from 'react-native-popable';
import { useQueryClient } from 'react-query';
import { useUpdateUserDoki } from '../../hooks/useUpdateUserDoki';
import { useUpdateUserItem } from '../../hooks/useUpdateUserItem';
// import { useUpdateUser } from '../../hooks/useUpdateUser';
import { createTriggerNotification } from '../../helpers/createTriggerNotification';
import {
  StyledItemContainer,
  StyledItemImage,
  StyledItemQuantity,
  StyledItemQuantityText,
} from '../styles';

const imageNames = {
  'video game': require('../../../assets/items/videogame.png'),
  slime: require('../../../assets/items/slime.png'),
  ball: require('../../../assets/items/ball.png'),
  'teddy bear': require('../../../assets/items/teddybear.png'),
  leaf: require('../../../assets/items/leaf.png'),
  paintbrush: require('../../../assets/items/paintbrush.png'),
};

const UserItem = ({ name, idNumber, quantity, curMoodLvl }) => {
  // console.log('user item name:', name);
  console.log('user item id:', idNumber);
  // console.log('user item quantity:', quantity);
  console.log('user item curMoodLvl:', curMoodLvl);

  const { ref, hide, show } = usePopable();
  const userDokiMutation = useUpdateUserDoki();
  // const userItemMutation = useUpdateUserItem();
  // const userMutation = useUpdateUser();
  const queryClient = useQueryClient();
  const [msgContent, setMsgContent] = useState(null);
  if (!idNumber) {
    return null;
  }
  return (
    <TouchableOpacity onPress={playWithDoki}>
      <StyledItemContainer>
        <StyledItemImage source={imageNames[name]} />
        <StyledItemQuantity>
          <StyledItemQuantityText>{quantity}</StyledItemQuantityText>
        </StyledItemQuantity>
      </StyledItemContainer>
      <Popable
        ref={ref}
        content={msgContent}
        style={styles.popable}
        animationType="spring"
      ></Popable>
    </TouchableOpacity>
  );

  function playWithDoki(itemId) {
    console.log('playwithdoki:', itemId);
    if (curMoodLvl >= 100) {
      setMsgContent("I'M ALL PLAYED OUT!");
      show();
      setTimeout(() => hide(), 1000);
    } else {
      const newMoodLevel = curMoodLvl + 5;
      const userDokiUpdate = {
        lastPlayedAt: new Date(),
        lastPlayedMoodLevel:
          curMoodLvl + (newMoodLevel > 100 ? 100 - curMoodLvl : 5), // Mood Increase Rate
      };
      userDokiMutation.mutate(userDokiUpdate, {
        onSuccess: () => {
          queryClient.invalidateQueries(['userDoki']);
        },
      });

      // const userItemUpdate = [itemId, { quantity: -1 }];
      // userItemMutation.mutate(userItemUpdate, {
      //   onSuccess: () => {
      //     queryClient.invalidateQueries(['userItems']);
      //   },
      // });
      setMsgContent('THIS IS SO MUCH FUN!');
      show();
      setTimeout(() => hide(), 1000);
      createTriggerNotification('play');
    }
  }
};

export default UserItem;

const styles = StyleSheet.create({
  popable: {
    alignSelf: 'center',
    marginTop: 330,
    width: 200,
  },
});
