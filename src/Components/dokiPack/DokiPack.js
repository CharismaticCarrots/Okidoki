import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useUserItemData } from '../../hooks/useUserItemData'
import { StyledContainer, StyledHeading1, StyledDokiHomeBackground, StyledItemView } from '../styles'
import UserItem from './UserItem'

const DokiPack = () => {
  const userItems = useUserItemData()
  let userItemList
  if (userItems){
    userItemList = userItems.map(item => {
      return <UserItem key={item.id} name={item.name} quantity={item.user_item.quantity}/>
    })
  }
  
  return (
        <StyledDokiHomeBackground
          source={require('../../../assets/backgrounds/selectEgg.png')}
          resizeMode='cover'
        >
          <View style={styles.container}>
          <StyledHeading1>Doki Backpack</StyledHeading1>
          <StyledItemView>
            {userItemList}
          </StyledItemView>
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