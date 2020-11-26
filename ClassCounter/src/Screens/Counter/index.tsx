import React, { useState } from 'react';
import { PanResponder } from 'react-native';
import Styled from 'styled-components/native';
import Button from '~/Components/Button';

const Container = Styled.SafeAreaView`
    flex: 1;
`;

const TitleContainer = Styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const TitleLabel = Styled.Text`
    font-size: 24px;
`;

const CountContainer = Styled.View`
    flex: 2;
    justify-content: center;
    align-items: center;
`;
const CountLabel = Styled.Text`
    font-size: 24px;
    font-weight: bold;
`;

const ButtonContainer = Styled.View`
    flex: 1;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
`;

interface Props {
    title?: string;
    initValue: number;
}

// 함수형 컴포넌트와 다르게 State의 타입을 미리 정의하고 컴포넌트 선언 시 해당 타입을 지정해 준다.
interface State {
    count: number
}

class Counter extends React.Component<Props, State> {
    // 클래스 컴포넌트에서는 클래스이므로 생성사 함수(constructor)에서 State의 초기 값을 설정한다.
    constructor(props: Props) {
        // 생성자 함수를 사용할 때, 주의점은 항상 super(props)를 사용하여 부모 컴포넌트(React.Component)의 생성자 함수를 호출해야 한다는 점이다.
        super(props);
        console.log('constructor');

        // 생성자 함수에서만 this.state를 사용하여 State의 값을 직접 지정할 수 있다.
        this.state = {
            count: props.initValue,
        };
    }

    render() {
        const { title } = this.props;
        const { count } = this.state;
        return (
            <Container>
                {title && (
                <TitleContainer>
                    <TitleLabel>{title}</TitleLabel>
                </TitleContainer>
            )}
            <CountContainer>
                <CountLabel>{count}</CountLabel>
            </CountContainer>
            <ButtonContainer>
                <Button iconName="plus" onPress={() => this.setState({ count: count + 1 })} />
                <Button iconName="plus" onPress={() => this.setState({ count: count - 1 })} />
            </ButtonContainer>
            </Container >
        );
    }
}

export default Counter;