// authReducer.js
import { LOGIN_SUCCESS, LOGIN_FAILURE, REGISTER_SUCCESS, REGISTER_FAILURE, FORGET_PW_SUCCESS, FORGET_PW_FAIL, PASSWORD_RESET_SUCCESS, PASSWORD_RESET_FAILURE, LOGOUT, SELECT_QR_CODE_DATA, SET_AUTH_USER } from './actionTypes';

const initialState = {
  user: null,
  loggedIn: false,
  error: null,
  qrCodeData: null,
  email: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        loggedIn: true,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        loggedIn: false,
        error: action.error || 'Login failed',
      };
    case REGISTER_SUCCESS:
      return state;
    case REGISTER_FAILURE:
      return {
        ...state,
        user: null,
        loggedIn: false,
        error: action.error || 'Registration failed',
      };
    case FORGET_PW_SUCCESS:
      return {
        ...state,
        user: null,
        loggedIn: false,
        message: action.message || 'Password reset request successful',
      };
    case FORGET_PW_FAIL:
      return {
        ...state,
        user: null,
        loggedIn: false,
        error: action.error || 'Password reset request failed',
      };
    case PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        user: null,
        loggedIn: false,
        message: action.message || 'Password reset successful',
      };
    case PASSWORD_RESET_FAILURE:
      return {
        ...state,
        user: null,
        loggedIn: false,
        error: action.error || 'Password reset failed',
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        loggedIn: false,
        error: null,
      };
    case SELECT_QR_CODE_DATA:
      return {
        ...state,
        qrCodeData: action.qrCodeUrl || '',
        email: action.email,
      };
    case SET_AUTH_USER:
      return {
        ...state,
        user: action.user,
        loggedIn: !!action.user,
      };
    default:
      return state;
  }
};

export default authReducer;
