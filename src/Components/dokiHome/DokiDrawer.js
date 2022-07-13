import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import CountDisplay from './CountDisplay'

const DokiDrawer = (props) => {
  const feedDoki = props.feedDoki
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={feedDoki}
      >
      <View style={styles.box}>
      <FontAwesome5 name={'carrot'} style={{fontSize: 50, color:'orange'}} />
      <Text style={styles.text}>{props.carrotCount}</Text>
      </View>
      </TouchableOpacity>
    </View>
  )
}

export default DokiDrawer

const styles = StyleSheet.create({
  container: {
   marginLeft:30,
  },
  box:{
    height:85,
    width:85,
    justifyContent: 'center',
    backgroundColor:'#ffefb4',
    padding:15,
    paddingLeft:20,
    borderRadius:10
  },
  text: {
    fontFamily:'Singularity',
    fontSize:20,
    marginLeft:'auto'
  }
})