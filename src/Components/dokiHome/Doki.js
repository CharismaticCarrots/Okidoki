import React from "react";
import { View } from "react-native";
import Sprite from "../Sprite";

const Doki = () => {
  return(
    <View>
      <Sprite
        src={require('../../../assets/fox_crouch_strip8.png')}
        totalSprites={8}
        tile={{ width: 60, height: 60 }}
        scale={4}
        framesPerSprite={8}
      />
    </View>
  );
};

export default Doki;
