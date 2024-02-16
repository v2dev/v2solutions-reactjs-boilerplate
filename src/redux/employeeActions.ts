// employeeActions.js
import * as actionTypes from './actionTypes';

export const setEmployees = (employees) => ({
  type: actionTypes.SET_EMPLOYEES,
  employees,
});

export const addEmployee = (employee) => ({
  type: actionTypes.ADD_EMPLOYEE,
  employee,
});

export const updateEmployee = (employee) => ({
  type: actionTypes.UPDATE_EMPLOYEE,
  employee,
});

export const deleteEmployee = (employeeId) => ({
  type: actionTypes.DELETE_EMPLOYEE,
  employeeId,
});

export const setSort = (sortOption) => ({
  type: actionTypes.SET_SORT,
  sortOption,
});

export const setFilter = (filterOption) => ({
  type: actionTypes.SET_FILTER,
  filterOption,
});
