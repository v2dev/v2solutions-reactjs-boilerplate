
import "@testing-library/jest-dom";
import todosReducer, {
  setTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from '../redux/todos';

jest.mock('../hooks/useCrudApi'); 



describe('todosReducer', () => {
  it('should handle SET_TODOS action', () => {
    const initialState = { todos: [] };
    const newTodos = [
      { _id: 1, title: 'Task 1', description: 'Description 1', completed: false },
      { _id: 2, title: 'Task 2', description: 'Description 2', completed: true },
    ];
    const action = setTodos(newTodos);

    const newState = todosReducer(initialState, action);

    expect(newState.todos).toEqual(newTodos);
  });

  it('should handle ADD_TODO action', () => {
    const initialState = { todos: [] };
    const newTodo = { _id: 1, title: 'New Task', description: 'Description', completed: false };
    const action = addTodo(newTodo);

    const newState = todosReducer(initialState, action);

    expect(newState.todos).toEqual([newTodo]);
  });

  it('should handle UPDATE_TODO action', () => {
    const initialState = {
      todos: [
        { _id: 1, title: 'Task 1', description: 'Description 1', completed: false },
        { _id: 2, title: 'Task 2', description: 'Description 2', completed: true },
      ],
    };
    const updatedTodo = { _id: 1, title: 'Updated Task', description: 'Description 1', completed: true };
    const action = updateTodo(updatedTodo);

    const newState = todosReducer(initialState, action);

    expect(newState.todos).toEqual([
      updatedTodo,
      { _id: 2, title: 'Task 2', description: 'Description 2', completed: true },
    ]);
  });

  it('should handle DELETE_TODO action', () => {
    const initialState = {
      todos: [
        { _id: 1, title: 'Task 1', description: 'Description 1', completed: false },
        { _id: 2, title: 'Task 2', description: 'Description 2', completed: true },
      ],
    };
    const todoIdToDelete = 1;
    const action = deleteTodo(todoIdToDelete);

    const newState = todosReducer(initialState, action);

    expect(newState.todos).toEqual([{ _id: 2, title: 'Task 2', description: 'Description 2', completed: true }]);
  });
});

