// 프로젝트 전반에 걸쳐서 타입을 사용할 수 있음
interface ITodoListContext{
    todoList: Array<string>;
    addTodoList: (todo: string) => void;
    removeTodoList: (index: number) => void;
}