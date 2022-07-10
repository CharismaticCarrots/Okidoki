import React from "react";
import { StyledProgressBarContainer, StyledProgressBar, StyledProgressText } from "../styles";

const DokiProgressBar = ({name, level}) => {
  debugger
  const progress = level/100;

  return (
    <StyledProgressBarContainer>
      <StyledProgressText>{name}</StyledProgressText>
      <StyledProgressBar progress={level && progress} color="#ddbb67"/>
    </StyledProgressBarContainer>
  );
};

export default DokiProgressBar;
