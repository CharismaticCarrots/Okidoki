import React, {useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Popable, usePopable } from 'react-native-popable';
import { useQueryClient } from 'react-query';
import { useUpdateUserDoki } from '../../hooks/useUpdateUserDoki';
import { useUpdateUser } from '../../hooks/useUpdateUser';
import { createTriggerNotification } from "../../helpers/createTriggerNotification";

const UserCarrots = ({curCarrotCount, curFullnessLvl}) => {
  const { ref, hide, show } = usePopable();
  const userDokiMutation = useUpdateUserDoki();
  const userMutation = useUpdateUser();
  const queryClient = useQueryClient();
  const [msgContent, setMsgContent] = useState(null);

  return (
    <TouchableOpacity onPress={feedDoki}>
      <View style={styles.box}>
        <FontAwesome5
          name={'carrot'}
          style={{ fontSize: 50, color: 'orange' }}
        />
        <Text style={styles.text}>{curCarrotCount}</Text>
      </View>
      <Popable
        ref={ref}
        content={msgContent}
        style={styles.popable}
        animationType="spring"
      ></Popable>
    </TouchableOpacity>
  );


  function feedDoki() {
    if (curCarrotCount <= 0 || curFullnessLvl >= 100) {
      if (curCarrotCount <= 0) {
        setMsgContent("UH OH, YOU'RE OUT OF CARROTS!");
      }
      if (curFullnessLvl >= 100) {
        setMsgContent("I'M TOO FULL RIGHT NOW!");
      }
    } else {
      const newFullnessLevel = curFullnessLvl + 5;
      const userDokiUpdate = {
        lastFedAt: new Date(),
        lastFedFullnessLevel:
          curFullnessLvl + (newFullnessLevel > 100 ? 100 - curFullnessLvl : 5), // Carrot-FullnessLevel Increase Rate
      };
      userDokiMutation.mutate(userDokiUpdate, {
        onSuccess: () => {
          queryClient.invalidateQueries(['userDoki'])
        },
      });
      userMutation.mutate(
        { carrotCount: curCarrotCount - 1 },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(['user'])
          },
        }
      );
      setMsgContent('OM NOM NOM');
      show();
      setTimeout(() => hide(), 1000);
      createTriggerNotification('feed');
    }
  };
};

export default UserCarrots;

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
    marginTop: 330,
    width: 200,
  },
});
