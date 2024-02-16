import { stat } from 'fs';
import ActionTypeEmployee, * as actionTypes from './actionTypes';
import { Action, AnyAction } from 'redux'
import { EmployeeActionType } from '../Models/employeeModel';


export interface IEmployeeAction {
    type: string;
    employeeName: string;
    employeeEmail: string;
    employeeDob: string;
    employeeDesignation: string;
    employeeEducation: string;
    errorMessage: string;
    currentPage: number;
    pageSize: number;
    employees: Array<any>[];
    rowCount: number;
    loading: boolean;
    actionType: EmployeeActionType;
    employee: any;
    modalOpen: boolean;
    deleteDialogOpen: boolean;
    employeeId: string;
}

const initialState = {
    employeeName: '',
    employeeEmail: '',
    employeeDob: '',
    employeeDesignation: '',
    employeeEducation: '',
    errorMessage: '',
    currentPage: 1,
    pageSize: 5,
    employees: [],
    rowCount: 0,
    loading: false,
    actionType: EmployeeActionType.Add,
    employee: {},
    modalOpen: false,
    deleteDialogOpen: false,
    employeeId: ''
};

const newEmployeeReducer = (state = initialState, action: IEmployeeAction) => {
    switch (action.type) {
        case ActionTypeEmployee.SET_EMPLOYEE_NAME:
            return {
                ...state,
                employeeName: action.employeeName,
            }
            break;
        case ActionTypeEmployee.SET_EMPLOYEE_EMAIL:
            return {
                ...state,
                employeeEmail: action.employeeEmail,
            }
            break;
        case ActionTypeEmployee.SET_EMPLOYEE_DOB:
            return {
                ...state,
                employeeDob: action.employeeDob,
            }
            break;
        case ActionTypeEmployee.SET_EMPLOYEE_DESIGNATION:
            return {
                ...state,
                employeeDesignation: action.employeeDesignation,
            }
            break;
        case ActionTypeEmployee.SET_EMPLOYEE_EDUCATION:
            return {
                ...state,
                employeeEducation: action.employeeEducation
            }
            break;
        case ActionTypeEmployee.SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
            break;
        case ActionTypeEmployee.SET_PAGE_SIZE:
            return {
                ...state,
                pageSize: action.pageSize
            }
            break;
        case ActionTypeEmployee.SET_ROW_COUNT:
            return {
                ...state,
                rowCount: action.rowCount
            }
            break;
        case ActionTypeEmployee.SET_LOADING:
            return {
                ...state,
                loading: action.loading
            }
            break;
        default:
            return state;
    }
}

export default newEmployeeReducer;