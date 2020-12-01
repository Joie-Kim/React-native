import React from 'react';
import {ActivityIndicator} from 'react-native'; // 리액트 네이티브가 제공하는 ActivityIndicator
import Styled from 'styled-components/native';

const Container = Styled.View`
    flex: 1;
    background-color: #141414;
    align-items: center;
    justify-content: center;
`;

const Loading = () => {
    return (
        <Container>
            <ActivityIndicator color="#E70915" size="large" />
        </Container>
    );
};

export default Loading;