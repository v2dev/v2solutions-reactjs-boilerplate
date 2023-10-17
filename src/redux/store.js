import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todos';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),

});

export default store;
