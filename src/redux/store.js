import { configureStore } from "@reduxjs/toolkit"
import todosReducer from "./todos"
import thunk from "redux-thunk"
import authReducer from "./auth"
const store = configureStore({
  reducer: {
    todos: todosReducer,
    auth:authReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})

export default store
