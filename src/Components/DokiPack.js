import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useUserItemData } from '../hooks/useUserItemData'
import { StyledContainer, StyledHeading1, StyledDokiHomeBackground } from './styles'

const DokiPack = () => {
  const userItem = useUserItemData()
  console.log('USER ITEMS', userItem)
  let userItemList
  // if (userItem){
  //   userItemList = userItem.map(item => {
  //     return <UserItem key={item.id} name={item.itemName} quantity={item.user_item.quantity}/>
  //   })
  // }
  
  return (
        <StyledDokiHomeBackground
          source={require('../../assets/backgrounds/dokihome_background.png')}
          resizeMode='cover'
        >
          <View style={styles.container}>
        <StyledHeading1>Doki Backpack</StyledHeading1>
        <View>
          {/* {userItemList} */}
        </View>
        </View>
      </StyledDokiHomeBackground>

  )
}

export default DokiPack

const styles = StyleSheet.create({
  container: {
    marginTop: 80
  }
})