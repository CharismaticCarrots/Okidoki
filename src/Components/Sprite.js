import React, { useState, useRef, useEffect } from "react";
import { StyledSpriteContainer, StyledTileContainer, StyledSpriteImage } from "./styles";

const Sprite = (props) => {
  const { src, tile, scale, framesPerSprite, totalSprites } = props;
  const [sprite, setSprite] = useState(0);
  const requestIdRef = useRef();

  useEffect(() => {
    requestIdRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestIdRef.current);
  }, [sprite]);

  let curFrame = 0;
  const animate = () => {
    if (curFrame === framesPerSprite) {
      curFrame = 0;
      setSprite((sprite + 1) % totalSprites);
    };
    curFrame += 1;
    requestIdRef.current = requestAnimationFrame(animate);
  }

  return (
    <StyledSpriteContainer>
      <StyledTileContainer width={tile.width} height={tile.height} scale={scale}>
        <StyledSpriteImage source={src} left={tile.width * sprite} />
      </StyledTileContainer>
    </StyledSpriteContainer>
  );
};

export default Sprite;
