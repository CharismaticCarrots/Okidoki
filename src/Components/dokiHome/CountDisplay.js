import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  StyledCountDisplayContainer,
  StyledCarrotCountContainer,
  StyledStepCountContainer,
  StyledCounterText,
} from '../styles';

const CountDisplay = ({ counterType, count, goalCount }) => {
  return (
    <StyledCountDisplayContainer>
      {counterType === 'carrot' && (
        <StyledCarrotCountContainer>
          <StyledCounterText>{count}</StyledCounterText>
          <FontAwesome5
            name={'carrot'}
            style={{ fontSize: 40, color: '#F3CE72' }}
          />
        </StyledCarrotCountContainer>
      )}
      {counterType === 'step' && (
        <StyledStepCountContainer>
          <FontAwesome5
            name={'shoe-prints'}
            style={{ fontSize: 30, color: '#F3CE72' }}
          />
          <StyledCounterText>
            {count} / {goalCount}
          </StyledCounterText>
        </StyledStepCountContainer>
      )}
    </StyledCountDisplayContainer>
  );
};

export default CountDisplay;
