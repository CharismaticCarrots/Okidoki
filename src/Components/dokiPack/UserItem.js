import React from 'react';
import { TouchableOpacity } from 'react-native';
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

const UserItem = (props) => {
  // console.log('PROPS INSIDE USER ITEM', props);

  return (
    <TouchableOpacity onPress={props.handlePlay}>
      <StyledItemContainer>
        <StyledItemImage source={imageNames[props.name]} />
        <StyledItemQuantity>
          <StyledItemQuantityText>{props.quantity}</StyledItemQuantityText>
        </StyledItemQuantity>
      </StyledItemContainer>
    </TouchableOpacity>
  );
};

export default UserItem;
