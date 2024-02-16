import { combineReducers } from "redux";
import employeeReducer from "./employeeReducer"
import authReducer from "./authReducer";
import newEmployeeReducer from "./newEmployeeReducer";

const rootReducer = combineReducers({
    employee: employeeReducer,
    auth: authReducer,
    newEmployee:newEmployeeReducer
});

export default rootReducer;