import React from "react";
import { StyledProgressBarContainer, StyledProgressBar, StyledProgressTextContainer, StyledProgressText, StyledProgressTextSmall } from "../styles";

const DokiProgressBar = ({name, level}) => {
  const progress = level/100;

  return (
    <StyledProgressBarContainer>
      <StyledProgressTextContainer>
        <StyledProgressText>{name}</StyledProgressText>
        <StyledProgressTextSmall>{`${level}/100`}</StyledProgressTextSmall>
      </StyledProgressTextContainer>
      <StyledProgressBar progress={level && progress} color="#ddbb67"/>
    </StyledProgressBarContainer>
  );
};

export default DokiProgressBar;
