import React from "react";
import { View } from "react-native";
import Sprite from "../Sprite";

const Doki = ({doki}) => {
  return(
    <View>
      {doki.type === "fox" &&
        <Sprite
          src={require('../../../assets/fox_crouch_strip8.png')}
          totalSprites={8}
          tile={{ width: 60, height: 60 }}
          scale={5}
          framesPerSprite={8}
        />
      }
      {doki.type === "cat" &&
        <Sprite
          src={require('../../../assets/catSprites/cat.png')}
          totalSprites={6}
          tile={{ width: 127, height: 90 }}
          scale={3}
          framesPerSprite={15}
        />
      }
      {doki.type === "bunny" &&
        <Sprite
          src={require('../../../assets/bunny_liedown_strip12.png')}
          totalSprites={12}
          tile={{ width: 40, height: 40 }}
          scale={6}
          framesPerSprite={15}
        />
      }
    </View>
  );
};

export default Doki;
