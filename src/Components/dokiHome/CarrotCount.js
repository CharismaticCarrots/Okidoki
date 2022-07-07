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

const StyledCarrotText = styled(Text)`
  font-size: 25px;
  font-weight: bold;
  margin: 10px;
`;

const CarrotCount = ({carrotCount}) => {
  return(
    <StyledCarrotCountContainer>
      <StyledCarrotText>{carrotCount}</StyledCarrotText>
      <FontAwesome5 name={'carrot'} style={{fontSize: 40}} />
    </StyledCarrotCountContainer>
  );
};

export default CarrotCount;
