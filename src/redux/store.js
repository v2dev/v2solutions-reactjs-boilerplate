import { configureStore } from "@reduxjs/toolkit"
import employeeReducer from "./employee"

import thunk from "redux-thunk"
import authReducer from "./auth"
const store = configureStore({
  reducer: {
    employee: employeeReducer,
    auth:authReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})

export default store
