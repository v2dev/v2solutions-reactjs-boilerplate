// Define action creators for login and registration
import API_BASE_URL from "../configs/apiBaseUrl"
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export const login = (email, password) => {
  

  return async (dispatch) => {
    try {
      // Make the API call for login
      const response = await fetch(API_BASE_URL + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        
        localStorage.setItem('token', data.token);
        dispatch({ type: 'LOGIN_SUCCESS', payload: data });
        history.push('/'); 
      } else {
        dispatch({ type: 'LOGIN_FAILURE' });
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
    }
  };
};
  
export const register = (email, password, name) => {
return async (dispatch) => {
    try {
    // Make the API call for registration
    const response = await fetch(API_BASE_URL + "/register", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
    });

    if (response.ok) {
        dispatch({ type: 'REGISTER_SUCCESS' });
    } else {
        dispatch({ type: 'REGISTER_FAILURE' });
    }
    } catch (error) {
    dispatch({ type: 'REGISTER_FAILURE' });
    }
};
};

const initialState = {
    user: null,
    loggedIn: false,
    error: null,
    // Add other necessary fields as per your application
  };
  
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        loggedIn: true,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        loggedIn: false,
        error: 'Login failed',
      };
    case 'REGISTER_SUCCESS':
      // Handle registration success
      return state; // Update state as required
    case 'REGISTER_FAILURE':
      // Handle registration failure
      return state; // Update state as required
    // Other cases as needed (e.g., logout)
    default:
      return state;
  }
};

export default authReducer;
  