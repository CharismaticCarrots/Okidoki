import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Popable, usePopable } from 'react-native-popable';
import { useQueryClient } from 'react-query';
import { useUpdateUserDoki } from '../../hooks/useUpdateUserDoki';
import { useUpdateUserItem } from '../../hooks/useUpdateUserItem';
import { createTriggerNotification } from '../../helpers/createTriggerNotification';
import {
  StyledItemContainer,
  StyledItemImage,
  StyledItemQuantity,
  StyledItemQuantityText,
} from '../styles';
import images from '../../images';

const UserItem = ({ name, idNumber, quantity, curMoodLvl }) => {
  const { ref, hide, show } = usePopable();
  const userDokiMutation = useUpdateUserDoki();
  const userItemMutation = useUpdateUserItem();
  const queryClient = useQueryClient();
  const [msgContent, setMsgContent] = useState(null);

  return (
    <TouchableOpacity onPress={playWithDoki}>
      <StyledItemContainer>
        <StyledItemImage source={images.store[name]} />
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

  function playWithDoki() {
    console.log('playwithdoki:', idNumber);
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

      const userItemUpdate = [idNumber, { quantity: -1 }];
      userItemMutation.mutate(userItemUpdate, {
        onSuccess: () => {
          queryClient.invalidateQueries(['userItem']);
        },
      });
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
