// actionTypes.js
export const SET_EMPLOYEES = 'SET_EMPLOYEES';
export const ADD_EMPLOYEE = 'ADD_EMPLOYEE';
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE';
export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';
export const SET_SORT = 'SET_SORT';
export const SET_FILTER = 'SET_FILTER';

export const SET_AUTH_USER = 'SET_AUTH_USER';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const FORGET_PW_SUCCESS = 'FORGET_PW_SUCCESS';
export const FORGET_PW_FAIL = 'FORGET_PW_FAIL';
export const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS';
export const PASSWORD_RESET_FAILURE = 'PASSWORD_RESET_FAILURE';
export const LOGOUT = 'LOGOUT';
export const SELECT_QR_CODE_DATA = 'SELECT_QR_CODE_DATA';

export const INCREASE = 'INCREASE';
export const DECREASE = 'DECREASE';

export default class ActionTypeEmployee {
    public static readonly SET_EMPLOYEE_NAME: string = 'SET_EMPLOYEE_NAME';
    public static readonly SET_EMPLOYEE_EMAIL: string = 'SET_EMPLOYEE_EMAIL';
    public static readonly SET_EMPLOYEE_DOB: string = 'SET_EMPLOYEE_DOB';
    public static readonly SET_EMPLOYEE_DESIGNATION: string = 'SET_EMPLOYEE_DESIGNATION';
    public static readonly SET_EMPLOYEE_EDUCATION: string = 'SET_EMPLOYEE_EDUCATION';
    public static readonly SET_ERROR_MESSAGE: string = 'SET_ERROR_MESSAGE';

    public static readonly SET_CURRENT_PAGE: string = 'SET_CURRENT_PAGE';
    public static readonly SET_PAGE_SIZE: string = 'SET_PAGE_SIZE';
    public static readonly SET_EMPLOYEES_DATA: string = 'SET_EMPLOYEES_DATA';
    public static readonly SET_ROW_COUNT: string = 'SET_ROW_COUNT';
    public static readonly SET_LOADING: string = 'SET_LOADING';
    public static readonly SET_ACTION_TYPE: string = 'SET_ACTION_TYPE';
    public static readonly SET_EMPLOYEE_DATA: string = 'SET_EMPLOYEE_DATA';
    public static readonly SET_MODAL_OPEN: string = 'SET_MODAL_OPEN';
    public static readonly SET_DELETE_DIALOG_OPEN: string = 'SET_DELETE_DIALOG_OPEN';
    public static readonly SET_EMPLOYEE_ID: string = 'SET_EMPLOYEE_ID';
}
