import React from 'react';
import {Platform} from 'react-native';
import Styled from 'styled-components/native';

import Background from './Background';
import TextInput from './TextInput';

// 키보드가 활성화되면서 입력창을 가리느나 문제를 해결하기 위한 컴포넌트
const Container = Styled.KeyboardAvoidingView`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    justify-content: flex-end;
`;

// 화면에 표시된 TodoInput 컴포넌트를 숨기기 위해 부모 컴포넌트인 AddTodo 컴포넌트로부터
// hideTodoInput 함수를 Props를 통해 전달받음
interface Props {
    hideTodoInput: () => void;
}

// Background 컴포넌트를 선택 했을 때,
// TextInput 컴포넌트에서 텍스트 입력이 완료 되었을 때,
// hideTodoInput 함수를 호출하여 컴포넌트를 숨긴다.
const TodoInput = ({ hideTodoInput }: Props) => {
    return (
        <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <Background onPress={hideTodoInput} />
            <TextInput hideTodoInput={hideTodoInput} />
        </Container>
    );
};

export default TodoInput;