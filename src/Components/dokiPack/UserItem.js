import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const UserItem = (props) => {
  console.log(props.name, 'inside pack')
  return (
    <View>
      
      <Card>
        <Card.Cover source={require('../../../assets/items/ball.png')}/>
        <Card.Content>
          <Title>
          {props.name}
          </Title>
          <Paragraph>
            Quantity: {props.quantity}
          </Paragraph>
        </Card.Content>
      </Card>
    </View>
  )
}

export default UserItem

const styles = StyleSheet.create({})