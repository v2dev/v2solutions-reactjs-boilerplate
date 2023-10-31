// Define action creators for login and registration
import { redirect } from "react-router-dom";
import API_BASE_URL from "../configs/apiBaseUrl"

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
        return { success: true }; // Indicate successful login

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

export const logoutUser = (dispatch) => {
  return () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
    return redirect('/auth');
  };
};
export const checkAuthLoader = (dispatch) => {
  
  return () => {
    
    const token = localStorage.getItem('token');
    if (token) {
      if (!isTokenExpired(token)) {
        // If the token is valid, dispatch an action indicating successful login
        
        dispatch({ type: 'LOGIN_SUCCESS', payload: { token } });
        return true; // Return true to allow the route to render
      }
    }
    return redirect('/auth');
  
  };
};

const decodeToken = (token) => {
  const tokenParts = token.split('.'); // Split the token into its parts
  if (tokenParts.length === 3) {
    const payload = tokenParts[1]; // Get the second part which contains the payload

    // Decode the payload using Base64URL decoding
    const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));

    // Parse the decoded payload to get the data
    const tokenData = JSON.parse(decodedPayload);
    
    return tokenData;
  }
  return null; // Invalid token format
};

const isTokenExpired = (token) => {
  const decodedToken = decodeToken(token);

  if (decodedToken && decodedToken.exp) {
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decodedToken.exp < currentTime; // Check if expiration time is in the past
  }
  return true; // Treat the token as expired if it's invalid or doesn't contain expiration time
};


const initialState = {
  user: null,
  loggedIn: false,
  error: null,
};
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        
        localStorage.setItem('token', action.payload.token); 
        return {
          ...state,
          user: action.payload.user,
          loggedIn: !isTokenExpired(action.payload.token), 
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
      case 'LOGOUT':
        
        return {
          ...state,
          user: null,
          loggedIn: false,
          error: null,
        };
      // Other cases as needed (e.g., additional actions related to user authentication)
      default:
        return state;
    }
  };
  
  

export default authReducer;
  