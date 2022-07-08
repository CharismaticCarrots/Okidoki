import React from "react";
import { View } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { StyledCarrotCountContainer, StyledStepCountContainer, StyledCounterText } from "../styles";

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
