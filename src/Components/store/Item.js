import { StyleSheet, View, Text, Image } from 'react-native';
// import { StyledHeading1 } from '../styles';

const imageNames = {
  Ball: require('../../../assets/items/ball.png'),
  'Teddy bear': require('../../../assets/items/teddybear.png'),
};

const Item = (props) => {
  return (
    <View style={styles.item}>
      <Image style={styles.itemImg} source={imageNames[props.name]} />
      <Text>{props.price}</Text>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  item: {
    height: 60,
    width: 60,
  },
  itemImg: {
    height: '100%',
    width: '100%',
  },
});
