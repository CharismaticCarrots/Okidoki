import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useUserItemData } from '../../hooks/useUserItemData';
import UserItem from '../dokiPack/UserItem';
import { Popable, usePopable } from 'react-native-popable';

const DokiDrawer = (props) => {
  const { ref, hide, show } = usePopable();

  const handleFeed = () => {
    props.feedDoki();
    show();
    setTimeout(() => hide(), 1000);
  };

  const handlePlay = () => {
    props.playWithDoki();
    show();
    setTimeout(() => hide(), 1000);
  };

  const userItems = useUserItemData();
  let userItemList;
  if (userItems) {
    userItemList = userItems.map((item) => {
      return (
        <UserItem
          handlePlay={handlePlay}
          key={item.id}
          name={item.name}
          quantity={item.user_item.quantity}
        />
      );
    });
  }
  console.log('PROPS INSIDE DOKI DRAWER', props);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
        nestedScrollEnabled={true}
      >
        <TouchableOpacity onPress={handleFeed}>
          <View style={styles.box}>
            <FontAwesome5
              name={'carrot'}
              style={{ fontSize: 50, color: 'orange' }}
            />
            <Text style={styles.text}>{props.carrotCount}</Text>
          </View>
        </TouchableOpacity>
        {userItemList}
      </ScrollView>
      <Popable
        ref={ref}
        content={props.msgContent}
        style={styles.popable}
        animationType="spring"
      ></Popable>
    </View>
  );
};

export default DokiDrawer;

const styles = StyleSheet.create({
  container: {
    marginLeft: 30,
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
  },
  box: {
    height: 85,
    width: 85,
    justifyContent: 'center',
    backgroundColor: '#ffefb4',
    padding: 15,
    paddingLeft: 20,
    borderRadius: 10,
    margin: 15,
  },
  text: {
    fontFamily: 'Singularity',
    fontSize: 20,
    marginLeft: 'auto',
  },
  popable: {
    alignSelf: 'center',
    marginTop: 350,
    width: 200,
  },
});
