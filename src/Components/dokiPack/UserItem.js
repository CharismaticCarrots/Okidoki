import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Popable, usePopable } from 'react-native-popable';
import { useQueryClient } from 'react-query';
import { useUpdateUserDoki } from '../../hooks/useUpdateUserDoki';
import { useUpdateUser } from '../../hooks/useUpdateUser';
import { createTriggerNotification } from "../../helpers/createTriggerNotification";
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

const UserItem = ({name, quantity, curMoodLvl}) => {
  const { ref, hide, show } = usePopable();
  const userDokiMutation = useUpdateUserDoki();
  const userMutation = useUpdateUser();
  const queryClient = useQueryClient();
  const [msgContent, setMsgContent] = useState(null);

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

  function playWithDoki () {
    if (curMoodLvl >= 100) {
      setMsgContent("I'M ALL PLAYED OUT!");
    } else {
      const newMoodLevel = curMoodLvl + 5;
      const userDokiUpdate = {
        lastPlayedAt: new Date(),
        lastPlayedMoodLevel:
          curMoodLvl + (newMoodLevel > 100 ? 100 - curMoodLvl : 5), // Mood Increase Rate
      };
      userDokiMutation.mutate(userDokiUpdate, {
        onSuccess: () => {
          queryClient.invalidateQueries(['userDoki'])
        },
      });
      setMsgContent('THIS IS SO MUCH FUN!');
      show();
      setTimeout(() => hide(), 1000);
      createTriggerNotification('play');
    }
  };
};

export default UserItem;

const styles = StyleSheet.create({
  popable: {
    alignSelf: 'center',
    marginTop: 330,
    width: 200,
  },
});
