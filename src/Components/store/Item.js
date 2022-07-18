import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import images from '../../images';

const Item = (props) => {
  const purchaseItem = props.purchaseItem;

  return (
    <TouchableOpacity onPress={() => purchaseItem(props.id, props.price)}>
      <View style={styles.item}>
        <Image style={styles.itemImg} source={images.store[props.name]} />
        <Text style={styles.itemName}>{props.name}</Text>
        <Text style={styles.itemPrice}>{props.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Item;

const styles = StyleSheet.create({
  item: {
    width: 105,
    height: 105,
    backgroundColor: '#ffefb4',
    borderRadius: 10,
    alignItems: 'center',
    margin: 10,
    padding: 8,
    paddingBottom: 15,
    borderColor: '#333',
    borderWidth: 3,
  },
  itemImg: {
    height: '60%',
    width: '60%',
    marginBottom: 5,
  },
  itemName: {
    fontFamily: 'Singularity',
    fontSize: 18,
    color: '#333',
    marginBottom: 2,
  },
  itemPrice: {
    fontFamily: 'Singularity',
    fontSize: 22,
    color: '#333',
  },
});
