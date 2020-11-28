import React from 'react';
import Styled from 'styled-components/native';

const Container = Styled.View`
    flex-direction: row;
    background-color: #FFF;
    margin: 4px 16px;
    padding: 8px 16px;
    border-radius: 8px;
    align-items: center;
`;
const Label = Styled.Text`
    flex: 1;
`;
const DeleteButton = Styled.TouchableOpacity``;
const Icon = Styled.Image`
    width: 24px;
    height: 24px;
`;

interface Props {
    text: string;
    onDelete: () => void;
}

// 부모 컴포넌트(TodoList 컴포넌트)로부터, 할 일 데이터 하나(text: string)를 전달받아 화면에 표시
// 해당 할 일 데이터를 지우기 위한 삭제 함수 (onDelete: () => void)를 전달받아, 데이터가 삭제 되도록 설정
const TodoItem = ({ text, onDelete }: Props) => {
    return (
        <Container>
            <Label>{text}</Label>
            <DeleteButton onPress={onDelete}>
                <Icon source={require('~/Assets/Images/remove.png')} />
            </DeleteButton>
        </Container>
    );
};

export default TodoItem;