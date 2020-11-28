import React, { useContext } from 'react';
import Styled from 'styled-components/native';

import { TodoListContext } from '~/Context/TodoListContext';

const Input = Styled.TextInput`
    width: 100%;
    height: 40px;
    background-color: #FFF;
    padding: 0px 8px;
`;

interface Props {
    hideTodoInput: () => void;
}

const TextInput = ({ hideTodoInput }: Props) => {
    // 전역 데이터인 할 일 리스트에 데이터를 추가하기 위해 addTodoList 함수를 할당
    const { addTodoList } = useContext<ITodoListContext>(TodoListContext);
    return (
        <Input
            autoFocus={true}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="할 일을 입력하세요."
            returnKeyType="done"
            onSubmitEditing={({ nativeEvent }) => { // 키보드의 '완료' 버튼을 눌렀을 때 호출
                addTodoList(nativeEvent.text);
                hideTodoInput();
            }}
        />
    );
};

export default TextInput;