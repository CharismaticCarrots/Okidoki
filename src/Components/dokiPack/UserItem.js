import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Card, Title, Paragraph } from 'react-native-paper';
import { StyledItemCard, StyleItemImage } from '../styles';

const imageNames = {
  'video game': require('../../../assets/items/videogame.png'),
  slime: require('../../../assets/items/slime.png'),
  ball: require('../../../assets/items/ball.png'),
  'teddy bear': require('../../../assets/items/teddybear.png'),
  leaf: require('../../../assets/items/leaf.png'),
  paintbrush: require('../../../assets/items/paintbrush.png'),
};

const UserItem = (props) => {
  
  return (
    <TouchableOpacity>
    <View style={styles.box}>
        <StyleItemImage source={imageNames[props.name]}/>
          <View style={styles.quantity}>
          <Text style={styles.text}>
             {props.quantity}
          </Text>
          </View>
    </View>
    </TouchableOpacity>
  )
}

export default UserItem

const styles = StyleSheet.create({
  container: {
   marginLeft:30,
   display: 'flex',
  flexDirection: 'row',
  flex:1
  },
  box:{
    height:85,
    width:85,
    justifyContent: 'center',
    alignContent:'center',
    backgroundColor:'#ffefb4',
    padding:15,
    paddingTop:13,
    borderRadius:10,
    margin:15,
  },
  text: {
    fontFamily:'Singularity',
    fontSize:23,
    marginLeft:'auto',
  },
  quantity: {
    // height:23,
    // width:23,
    // justifyContent: 'center',
    // alignItems:'center',
    // backgroundColor:'#C7CDAB',
    // borderRadius:100,
    // paddingTop:2,
    // marginLeft:'auto',
  }
})

{/* <View>
<StyledItemCard>
  <StyleItemImage source={imageNames[props.name]}/>
  <Card.Content>
    <Title style={{fontFamily:'AntipastoBold'}}>
    {props.name}
    </Title>
    <Paragraph style={{fontFamily:'Singularity', fontSize:17}}>
      Quantity: {props.quantity}
    </Paragraph>
  </Card.Content>
  </StyledItemCard>
</View> */}