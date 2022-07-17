import React from "react";
import Sprite from "../Sprite";
import images from "../../images";
import { StyledInnerDokiContainer } from "../styles";

const Doki = ({userDoki, dokiMood}) => {
  return(
    <StyledInnerDokiContainer>
      { userDoki.type === "cat" &&
        (
          dokiMood === 'idle' &&
            (<Sprite
                src={images.sprites.cat.idle}
                totalSprites={6}
                tile={{ width: 128, height: 90 }}
                scale={3}
                framesPerSprite={15}
              />)
          || dokiMood === 'happy' &&
            (<Sprite
                src={images.sprites.cat.happy}
                totalSprites={18}
                tile={{ width: 128, height: 90 }}
                scale={2.5}
                framesPerSprite={15}
              />)
          || dokiMood === 'sleep' &&
            (<Sprite
                src={images.sprites.cat.sleep}
                totalSprites={6}
                tile={{ width: 128, height: 80 }}
                scale={2.5}
                framesPerSprite={15}
              />)
      )}
      { userDoki.type === "fox" &&
        (
          dokiMood === 'idle' &&
            (<Sprite
                src={images.sprites.fox.idle}
                totalSprites={24}
                tile={{ width: 60, height: 60 }}
                scale={5}
                framesPerSprite={8}
              />)
          || dokiMood === 'happy' &&
            (<Sprite
                src={images.sprites.fox.happy}
                totalSprites={8}
                tile={{ width: 60, height: 60 }}
                scale={5}
                framesPerSprite={8}
              />)
          || dokiMood === 'sleep' &&
            (<Sprite
                src={images.sprites.fox.sleep}
                totalSprites={5}
                tile={{ width: 60, height: 60 }}
                scale={5}
                framesPerSprite={25}
              />)
        )}
        { userDoki.type === "whitefox" &&
        (
          dokiMood === 'idle' &&
            (<Sprite
                src={images.sprites.whitefox.idle}
                totalSprites={24}
                tile={{ width: 60, height: 60 }}
                scale={5}
                framesPerSprite={8}
              />)
          || dokiMood === 'happy' &&
            (<Sprite
                src={images.sprites.whitefox.happy}
                totalSprites={8}
                tile={{ width: 60, height: 60 }}
                scale={5}
                framesPerSprite={8}
              />)
          || dokiMood === 'sleep' &&
            (<Sprite
                src={images.sprites.whitefox.sleep}
                totalSprites={5}
                tile={{ width: 60, height: 60 }}
                scale={5}
                framesPerSprite={25}
              />)
        )}
    </StyledInnerDokiContainer>
  );
};

export default Doki;
