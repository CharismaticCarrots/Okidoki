import { StyleSheet, View, Image } from 'react-native'
import React from 'react'
import { Card, Title, Paragraph } from 'react-native-paper';
import { StyledItemCard, StyleItemImage } from '../styles';

const imageNames = {
  ball: require('../../../assets/items/ball.png'),
  'teddy bear': require('../../../assets/items/teddybear.png'),
};


const UserItem = (props) => {
  
  return (
    <View>
      <StyledItemCard>
        <StyleItemImage source={imageNames[props.name]}/>
        <Card.Content>
          <Title>
          {props.name}
          </Title>
          <Paragraph>
            Quantity: {props.quantity}
          </Paragraph>
        </Card.Content>
        </StyledItemCard>
    </View>
  )
}

export default UserItem
