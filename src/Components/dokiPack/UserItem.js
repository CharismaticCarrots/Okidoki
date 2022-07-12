import { StyleSheet, View, Image } from 'react-native'
import React from 'react'
import { Card, Title, Paragraph } from 'react-native-paper';

const imageNames = {
  ball: require('../../../assets/items/ball.png'),
  'teddy bear': require('../../../assets/items/teddybear.png'),
};


const UserItem = (props) => {
  
  return (
    <View>
      <Card style={styles.card}>
        <Image source={imageNames[props.name]} style={styles.image}/> 
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

const styles = StyleSheet.create({
  card: {
    height: 130,
    width:150,
    backgroundColor:"#ffefb4",
    margin:10,
    paddingTop:15,
    justifyContent:'center'
  },
  image: {
    marginLeft:'auto',
    marginRight: 'auto',
    height: 40,
    width: 40
  }
})