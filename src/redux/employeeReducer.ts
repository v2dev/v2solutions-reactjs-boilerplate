import * as actionTypes from './actionTypes';


const initialState = {
  employees: [],
  sortOption: null,
  filterOption: null,
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_EMPLOYEES:
      return {
        ...state,
        employees: action.employees,
      };
    case actionTypes.ADD_EMPLOYEE:
      return {
        ...state,
        employees: [...state.employees, action.employee],
      };
    case actionTypes.UPDATE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.map((employee) =>
          employee.id === action.employee.id ? action.employee : employee
        ),
      };
    case actionTypes.DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter(
          (employee) => employee.id !== action.employeeId
        ),
      };
    case actionTypes.SET_SORT:
      return {
        ...state,
        sortOption: action.sortOption,
      };
    case actionTypes.SET_FILTER:
      return {
        ...state,
        filterOption: action.filterOption,
      };
    default:
      return state;
  }
};

export default employeeReducer;
