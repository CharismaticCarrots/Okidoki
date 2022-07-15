import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from 'react-native';
import {
  StyledItemContainer,
  StyledItemImage,
  StyledItemQuantity,
  StyledItemQuantityText,
} from '../styles';
import { Popable, usePopable } from 'react-native-popable';
import { useQueryClient } from 'react-query';
import { useUpdateUserDoki } from '../../hooks/useUpdateUserDoki';
import { useUpdateUser } from '../../hooks/useUpdateUser';
import { createTriggerNotification } from "../../helpers/createTriggerNotification";

const UserCarrots = ({curCarrotCount, curFullnessLvl}) => {
  const { ref, hide, show } = usePopable();
  const userDokiMutation = useUpdateUserDoki();
  const userMutation = useUpdateUser();
  const queryClient = useQueryClient();
  const [msgContent, setMsgContent] = useState(null);

  return (
    <TouchableOpacity onPress={feedDoki}>
      <StyledItemContainer>
        <StyledItemImage
          source={require('../../../assets/items/carrot.png')}
        />
        <StyledItemQuantity>
          <StyledItemQuantityText>
            {curCarrotCount}
          </StyledItemQuantityText>
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


  function feedDoki() {
    if (curCarrotCount <= 0 || curFullnessLvl >= 100) {
      if (curCarrotCount <= 0) {
        setMsgContent("UH OH, YOU'RE OUT OF CARROTS!");
      }
      if (curFullnessLvl >= 100) {
        setMsgContent("I'M TOO FULL RIGHT NOW!");
      }
    } else {
      const newFullnessLevel = curFullnessLvl + 5;
      const userDokiUpdate = {
        lastFedAt: new Date(),
        lastFedFullnessLevel:
          curFullnessLvl + (newFullnessLevel > 100 ? 100 - curFullnessLvl : 5), // Carrot-FullnessLevel Increase Rate
      };
      userDokiMutation.mutate(userDokiUpdate, {
        onSuccess: () => {
          queryClient.invalidateQueries(['userDoki'])
        },
      });
      userMutation.mutate(
        { carrotCount: curCarrotCount - 1 },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(['user'])
          },
        }
      );
      setMsgContent('OM NOM NOM');
      show();
      setTimeout(() => hide(), 1000);
      createTriggerNotification('feed');
    }
  };
};

export default UserCarrots;

const styles = StyleSheet.create({
  popable: {
    alignSelf: 'center',
    marginTop: 330,
    width: 200,
  },
});
