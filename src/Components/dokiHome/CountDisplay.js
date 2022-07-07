import React from "react";
import { View, Text } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styled from "styled-components";

const StyledCarrotCountContainer = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100px;
`;

const StyledStepCountContainer = styled(StyledCarrotCountContainer)`
  width: 200px;
`;

const StyledCounterText = styled(Text)`
  font-size: 25px;
  font-weight: 900;
  margin: 10px;
`;

const CountDisplay = ({counterType, count, goalCount}) => {
  return(
    <View>
      {counterType === "carrot" &&
        <StyledCarrotCountContainer>
        <StyledCounterText>{count}</StyledCounterText>
        <FontAwesome5 name={'carrot'} style={{fontSize: 40}} />
        </StyledCarrotCountContainer>
      }
      {counterType === "step" &&
        <StyledStepCountContainer>
          <FontAwesome5 name={'shoe-prints'} style={{fontSize: 30}} />
          <StyledCounterText>{count} / {goalCount}</StyledCounterText>
        </StyledStepCountContainer>
      }
    </View>
  );
};

export default CountDisplay;
