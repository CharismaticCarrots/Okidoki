import React from "react";
import { StyledProgressBarContainer, StyledProgressBar, StyledProgressText } from "../styles";

const DokiProgressBar = ({name, progress}) => {
  return (
    <StyledProgressBarContainer>
      <StyledProgressText>{name}</StyledProgressText>
      <StyledProgressBar progress={progress} color="#ddbb67" />
    </StyledProgressBarContainer>
  );
};

export default DokiProgressBar;
