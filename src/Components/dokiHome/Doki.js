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
          src={require('../../../assets/fox_crouch_strip8.png')}
          totalSprites={8}
          tile={{ width: 60, height: 60 }}
          scale={5}
          framesPerSprite={8}
        />
      }
      {userDoki.type === "cat" &&
        <Sprite
          src={require('../../../assets/catSprites/cat.png')}
          totalSprites={6}
          tile={{ width: 128, height: 90 }}
          scale={3}
          framesPerSprite={15}
        />
      }
      {userDoki.type === "bunny" &&
        <Sprite
          src={require('../../../assets/bunny_liedown_strip12.png')}
          totalSprites={12}
          tile={{ width: 40, height: 40 }}
          scale={6}
          framesPerSprite={15}
        />
      }
    </StyledInnerDokiContainer>
  );
};

export default Doki;
