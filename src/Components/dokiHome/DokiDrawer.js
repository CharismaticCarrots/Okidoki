import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Pressable } from 'react-native'
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useUserItemData } from '../../hooks/useUserItemData'
import CountDisplay from './CountDisplay'
import UserItem from '../dokiPack/UserItem'

const DokiDrawer = (props) => {
  const userItems = useUserItemData()
  let userItemList
  if (userItems){
    userItemList = userItems.map(item => {
      return <UserItem key={item.id} name={item.name} quantity={item.user_item.quantity}/>
    })
  }
  const feedDoki = props.feedDoki
  return (
    <View style={styles.container}>
      <ScrollView
         horizontal={true}
         contentContainerStyle={{flexGrow:1}}
         bounces={false}
         nestedScrollEnabled={true}
        
      >
      <TouchableOpacity
        onPress={feedDoki}
      >
      <View style={styles.box}>
      <FontAwesome5 name={'carrot'} style={{fontSize: 50, color:'orange'}} />
      <Text style={styles.text}>{props.carrotCount}</Text>
      </View>
      </TouchableOpacity>
      {userItemList}
      </ScrollView>
    </View>
  )
}

export default DokiDrawer

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
    backgroundColor:'#ffefb4',
    borderColor:'##fff',
    padding:15,
    paddingLeft:20,
    borderRadius:10,
    margin:15,

  },
  text: {
    fontFamily:'Singularity',
    fontSize:20,
    marginLeft:'auto'
  }
})