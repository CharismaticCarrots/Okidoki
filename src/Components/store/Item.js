import { StyleSheet, View, Text, Image } from 'react-native';
// import { StyledHeading1 } from '../styles';

const imageNames = {
  ball: require('../../../assets/items/ball.png'),
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
    height: 40,
    width: 40,
  },
  itemImg: {
    height: '100%',
    width: '100%',
  },
});
