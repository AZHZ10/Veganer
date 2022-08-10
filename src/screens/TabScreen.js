import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align=items: center;
`;
const StyledText = styled.Text`
  font-size: 30px;
`;

export const Calender = () => {
    return(
        <Container>
            <StyledText>Mail</StyledText>
        </Container>
    );
};

export const Chat = () => {
    return(
        <Container>
            <StyledText>Chat</StyledText>
        </Container>
    );
};

export const Lens = () => {
    return(
        <Container>
            <StyledText>Lens</StyledText>
        </Container>
    );
};