import React from "react";
import { StyleSheet, View } from "react-native";
import axios from 'axios';
import { useQueryClient, useQuery } from 'react-query';
import Steps from "./Steps";
import Sprite from "./Sprite";

// Fetch call
const fetchDitto = async () => {
  const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon/ditto');
  return data;
};

const Home = () => {
  // const { isLoading, isError, data : ditto, error } = useQuery('ditto', fetchDitto);

  return (
    <View style={styles.container}>
      <Sprite
        src={require("../../assets/sprite.png")}
        totalSprites={4}
        tile={{ width: 20, height: 24 }}
        scale={2}
        framesPerSprite={8}
      />
      <Steps />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

