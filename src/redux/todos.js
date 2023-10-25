// Redux actions
const SET_TODOS = "todos/SET_TODOS"
const ADD_TODO = "todos/ADD_TODO"
const UPDATE_TODO = "todos/UPDATE_TODO"
const DELETE_TODO = "todos/DELETE_TODO"

export const setTodos = (todos) => ({
  type: SET_TODOS,
  todos,
})

export const addTodo = (todo) => ({
  type: ADD_TODO,
  todo,
})

export const updateTodo = (todo) => ({
  type: UPDATE_TODO,
  todo,
})

export const deleteTodo = (todoId) => ({
  type: DELETE_TODO,
  todoId,
})

// Redux reducer
const initialState = { todos: [] }

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TODOS:
      return { ...state, todos: action.todos }
    case ADD_TODO:
      return { ...state, todos: [...state.todos, action.todo] }
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo._id === action.todo._id ? action.todo : todo,
        ),
      }
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== action.todoId),
      }
    default:
      return state
  }
}
