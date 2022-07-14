import React from 'react';
import {
  StyledProgressBarContainer,
  StyledProgressBar,
  StyledProgressTextContainer,
  StyledProgressText,
  StyledProgressTextSmall,
} from '../styles';

const DokiProgressBar = ({ name, level, total }) => {
  const progress = level / total;

  return (
    <StyledProgressBarContainer>
      <StyledProgressTextContainer>
        <StyledProgressText>{name}</StyledProgressText>
        <StyledProgressTextSmall>
          {name === 'Hatch' ? '' : `${level}/${total}`}
        </StyledProgressTextSmall>
      </StyledProgressTextContainer>
      <StyledProgressBar progress={level && progress} color="#ccd5ae" />
    </StyledProgressBarContainer>
  );
};

export default DokiProgressBar;
