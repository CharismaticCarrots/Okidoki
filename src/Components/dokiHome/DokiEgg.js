import { View, Text } from "react-native";
import Sprite from "../Sprite";

const DokiEgg = () => {
  return(
    <View>
      <Sprite
        src={require('../../../assets/dokiEgg_1.png')}
        totalSprites={13}
        tile={{ width: 16, height: 16 }}
        scale={5}
        framesPerSprite={20}
      />
    </View>
  );
};

export default DokiEgg;
