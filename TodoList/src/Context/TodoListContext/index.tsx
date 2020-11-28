// createContext: Context 생성
// useState: 생성한 State 데이터를 Context 안에 저장할 예정 (이렇게 하면 Context의 데이터를 수정할 수 있음)
// useEffect: AsyncStorage에 저장된 데이터를 가져와 설정하도록 할 예정
// AsyncStorage: 앱 내 데이터 저장을 위해 사용하는 모듈
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage'; 

interface Props {
    children: JSX.Element | Array<JSX.Element>;
}

// createContext 함수에 초기 값을 할당하여 Context를 생성할 수 있음
// @types/index.d.ts에 정의한 타입을 사용하여 Context의 데이터 타입을 지정함
const TodoListContext = createContext<ITodoListContext>({
    todoList: [],
    addTodoList: (todo: string): void => {},
    removeTodoList: (index: number): void => {},
});

// TodoListContextProvider: 공통 부모 컴포넌트의 부모 컴포넌트가 될 예정
// 자식 컴포넌트(공통 부모 컴포넌트)를 children 매개 변수를 통해 전달 받음
const TodoListContextProvider = ({ children }: Props) => {
    // Context를 사용하기 위해 만든 프로바이더 컴포넌트도 리액트 네이티브 컴포넌트이므로
    // 컴포넌트 안에서 수정 가능한 데이터를 사용하기 위해서는 useState를 사용해야 함
    const [todoList, setTodoList] = useState<Array<string>>([]);

    // 할 일 리스트에 할 일을 추가하기 위한 함수
    const addTodoList = (todo: string): void => {
        // useState로 만든 todoList는 불변의 값
        // 따라서 새로운 리스트에 todoList의 모든 데이터(...todoList)를 넣음
        const list = [...todoList, todo];
        // State 값 변경
        setTodoList(list);
        // 데이터를 물리적으로 저장
        // JSON.stringify: 문자열 배열 데이터를 문자열로 변경
        AsyncStorage.setItem('todoList', JSON.stringify(list));
    };

    // 할 일 리스트에서 할 일을 삭제하기 위한 함수 (인덱스 값으로 삭제)
    const removeTodoList = (index: number): void => {
        let list = [...todoList];
        list.splice(index, 1);
        setTodoList(list);
        AsyncStorage.setItem('todoList', JSON.stringify(list));
    };

    // 앱이 시작될 때, AsyncStorage에 저장된 데이터를 불러와, Context 값을 초기화 하기 위한 함수
    // setItem, getItem 함수는 Promise 함수
    const initData = async () => {
        try {
            const list = await AsyncStorage.getItem('todoList');
            if (list !== null) {
                // 문자열 데이터를 문자열 배열 데이터로 변경
                setTodoList(JSON.parse(list));
            }
        } catch (e) {
            console.log(e);
        }
    };

    // 컴포넌트가 처음 화면에 표시된 후, 이 useEffect는 한 번만 호출됨
    useEffect(() => {
        initData();
    }, []);

    return (
        <TodoListContext.Provider
            value={{
                todoList,
                addTodoList,
                removeTodoList,
            }}>
            {children}
        </TodoListContext.Provider>
    );
};

export { TodoListContextProvider, TodoListContext };