import React, { useContext } from 'react';
import { FlatList } from 'react-native';
import Styled from 'styled-components/native';

import { TodoListContext } from '~/Context/TodoListContext';

import EmptyItem from './EmptyItem';
import TodoItem from './TodoItem';

// 리액트 네이티브의 리스트 뷰 중 하나인 FlatList 컴포넌트 사용
const Container = Styled(FlatList)`
`;
interface Props {}

const TodoList = ({ }: Props) => {
    const { todoList, removeTodoList } = useContext<ITodoListContext>(
        TodoListContext
    );
    return (
        <Container
            data={todoList} // 리스트 뷰에 표시할 데이터의 배열
            // 리객트에서 반복적으로 동일한 컴포넌트를 표시하기 위해서는 컴포넌트에 키 값을 설정해야 함
            keyExtractor={(item, index) => { // FlatList에서 반복적으로 표시하는 Item에 키 값을 설정하기 위한 Props
                return `todo-${index}`;
            }}
            ListEmptyComponent={<EmptyItem />} // 주어진 배열에 데이터가 없을 경우 표시되는 컴포넌트
            renderItem={({ item, index }) => ( // 주어진 배열에 데이터를 사용하여 반복적으로 표시될 컴포넌트
                <TodoItem
                    text={item as string}
                    onDelete={() => removeTodoList(index)}
                />
            )}
            // 표시할 데이터가 없는 경우 ListEmptyComponent의 컴포넌트가 화면에 표시되는데
            // 이 컴포넌트도 하나의 리스트 아이템으로 표시되기 때문에 전체 화면으로 표시되지 않음
            // 이 컴포넌트를 전체 화면으로 표시하기 위해서 flex: 1로 설정함
            contentContainerStyle={todoList.length === 0 && { flex: 1 }}
        />
    );
};

export default TodoList;