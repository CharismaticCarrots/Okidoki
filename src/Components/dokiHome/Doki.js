import React from "react";
import { View } from "react-native";
import Sprite from "../Sprite";
import styled from "styled-components";

const StyledInnerDokiContainer = styled(View)`
  display: flex;
  padding-top: 0px;
  width: 250px;
  height: 300px;
  justify-content: center;
  align-items: center;
  padding-bottom: 30px;
`;

const Doki = ({userDoki}) => {
  return(
    <StyledInnerDokiContainer>
      {userDoki.type === "fox" &&
        <Sprite
          src={require('../../../assets/sprites/fox_sprites/fox_idle.png')}
          totalSprites={24}
          tile={{ width: 60, height: 60 }}
          scale={5}
          framesPerSprite={8}
        />
        // <Sprite
        //   src={require('../../../assets/sprites/fox_sprites/fox_happy.png')}
        //   totalSprites={8}
        //   tile={{ width: 60, height: 60 }}
        //   scale={5}
        //   framesPerSprite={8}
        // />
        // <Sprite
        // src={require('../../../assets/sprites/fox_sprites/fox_sleep.png')}
        // totalSprites={5}
        // tile={{ width: 60, height: 60 }}
        // scale={5}
        // framesPerSprite={25}
        // />
      }
      {userDoki.type === "cat" &&
        // <Sprite
        //   src={require(`../../../assets/sprites/cat_sprites/cat_idle.png`)}
        //   totalSprites={6}
        //   tile={{ width: 128, height: 90 }}
        //   scale={3}
        //   framesPerSprite={15}
        // />
        // <Sprite
        // src={require(`../../../assets/sprites/cat_sprites/cat_happy.png`)}
        // totalSprites={18}
        // tile={{ width: 128, height: 90 }}
        // scale={2.5}
        // framesPerSprite={15}
        // />
        <Sprite
        src={require(`../../../assets/sprites/cat_sprites/cat_sleep.png`)}
        totalSprites={6}
        tile={{ width: 128, height: 80 }}
        scale={2.5}
        framesPerSprite={15}
        />
      }
      {userDoki.type === "whitefox" &&
        <Sprite
          src={require('../../../assets/sprites/whitefox_sprites/whitefox_idle.png')}
          totalSprites={24}
          tile={{ width: 60, height: 60 }}
          scale={5}
          framesPerSprite={8}
        />
        // <Sprite
        //   src={require('../../../assets/sprites/whitefox_sprites/whitefox_happy.png')}
        //   totalSprites={8}
        //   tile={{ width: 60, height: 60 }}
        //   scale={5}
        //   framesPerSprite={8}
        // />
        // <Sprite
        //   src={require('../../../assets/sprites/whitefox_sprites/whitefox_sleep.png')}
        //   totalSprites={5}
        //   tile={{ width: 60, height: 60 }}
        //   scale={5}
        //   framesPerSprite={25}
        // />
      }
    </StyledInnerDokiContainer>
  );
};

export default Doki;
