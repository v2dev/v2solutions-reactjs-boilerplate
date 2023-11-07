// actionTypes.js
export const SET_EMPLOYEES = 'SET_EMPLOYEES';
export const ADD_EMPLOYEE = 'ADD_EMPLOYEE';
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE';
export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';
export const SET_SORT = 'SET_SORT';
export const SET_FILTER = 'SET_FILTER';


export const setEmployees = (employees) => ({
  type: SET_EMPLOYEES,
  employees,
});

export const addEmployee = (employee) => ({
  type: ADD_EMPLOYEE,
  employee,
});

export const updateEmployee = (employee) => ({
  type: UPDATE_EMPLOYEE,
  employee,
});

export const deleteEmployee = (employeeId) => ({
  type: DELETE_EMPLOYEE,
  employeeId,
});

export const setSort = (sortOption) => ({
  type: SET_SORT,
  sortOption,
});

export const setFilter = (filterOption) => ({
  type: SET_FILTER,
  filterOption,
});

const initialState = {
  employees: [],
  sortOption: null,
  filterOption: null,
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EMPLOYEES:
      return {
        ...state,
        employees: action.employees,
      };
    case ADD_EMPLOYEE:
      return {
        ...state,
        employees: [...state.employees, action.employee],
      };
    case UPDATE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.map((employee) =>
          employee.id === action.employee.id ? action.employee : employee
        ),
      };
    case DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter(
          (employee) => employee.id !== action.employeeId
        ),
      };
    case SET_SORT:
      return {
        ...state,
        sortOption: action.sortOption,
      };
    case SET_FILTER:
      return {
        ...state,
        filterOption: action.filterOption,
      };
    default:
      return state;
  }
};

export default employeeReducer;
