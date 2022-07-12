import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const UserItem = (props) => {
  console.log(props.name, 'inside pack')
  return (
    <View>
      <Text>{props.quantity}</Text>
      <Card style={{backgroundColor:"#ffefb4"}}>
        <Card.Cover source={require('../../../assets/items/ball.png')} resizeMode='contain' style={{backgroundColor:"#ffefb4", margin:25}}/>
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