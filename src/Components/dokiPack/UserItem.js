import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const UserItem = (props) => {
  console.log(props.name, 'inside pack')
  return (
    <View>
      <Text>{props.name}</Text>
    </View>
  )
}

export default UserItem

const styles = StyleSheet.create({})