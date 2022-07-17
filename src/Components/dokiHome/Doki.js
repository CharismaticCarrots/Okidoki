import React from "react";
import { View } from "react-native";
import Sprite from "../Sprite";
import styled from "styled-components";
import images from "../../images";

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
        {userDoki.type === "cat" &&
        <Sprite
          src={images.sprites.cat.idle}
          totalSprites={6}
          tile={{ width: 128, height: 90 }}
          scale={3}
          framesPerSprite={15}
        />
        // <Sprite
        // src={images.sprites.cat.happy}
        // totalSprites={18}
        // tile={{ width: 128, height: 90 }}
        // scale={2.5}
        // framesPerSprite={15}
        // />
        // <Sprite
        // src={images.sprites.cat.sleep}
        // totalSprites={6}
        // tile={{ width: 128, height: 80 }}
        // scale={2.5}
        // framesPerSprite={15}
        // />
      }
      {userDoki.type === "fox" &&
        <Sprite
          src={images.sprites.fox.idle}
          totalSprites={24}
          tile={{ width: 60, height: 60 }}
          scale={5}
          framesPerSprite={8}
        />
        // <Sprite
        //   src={images.sprites.fox.happy}
        //   totalSprites={8}
        //   tile={{ width: 60, height: 60 }}
        //   scale={5}
        //   framesPerSprite={8}
        // />
        // <Sprite
        // src={images.sprites.fox.sleep}
        // totalSprites={5}
        // tile={{ width: 60, height: 60 }}
        // scale={5}
        // framesPerSprite={25}
        // />
      }
      {userDoki.type === "whitefox" &&
        <Sprite
          src={images.sprites.whitefox.idle}
          totalSprites={24}
          tile={{ width: 60, height: 60 }}
          scale={5}
          framesPerSprite={8}
        />
        // <Sprite
        //   src={images.sprites.whitefox.happy}
        //   totalSprites={8}
        //   tile={{ width: 60, height: 60 }}
        //   scale={5}
        //   framesPerSprite={8}
        // />
        // <Sprite
        //   src={images.sprites.whitefox.sleep}
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
