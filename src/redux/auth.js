// Define action creators for login and registration
import { redirect } from "react-router-dom";
import API_BASE_URL from "../configs/apiBaseUrl"
import { createSlice } from '@reduxjs/toolkit';

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      // Make the API call for login
      const response = await fetch(API_BASE_URL + "/user/login", {
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
        const data = await response.json();
        
        dispatch({ type: 'LOGIN_FAILURE' ,error: data.error});
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
    }
  };
};
  
export const register = (email, password, name) => {
  return async (dispatch) => {
      try {
        
        const response = await fetch(API_BASE_URL + "/user/signup", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, name }),
        });
        
        if (response.ok) {
          dispatch({ type: 'REGISTER_SUCCESS' });
          const data = await response.json();
          return { qrCodeUrl: data.qrCodeUrl }; 
        } else {
          const data = await response.json();
          
          dispatch({ type: 'REGISTER_FAILURE' ,error: data.error});
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

export const forgetPassword = (email) => {
  return async (dispatch) => {
    try {
      // Make the API call for login
      const response = await fetch(API_BASE_URL + "/forget-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: 'FORGET_PW_SUCCESS',  message: data.message });
        return { success: true }; 
      } else {
        const data = await response.json();
        
        dispatch({ type: 'FORGET_PW_FAIL' ,error: data.error});
      }
    } catch (error) {
      dispatch({ type: 'FORGET_PW_FAIL' });
    }
  };
};

export const resetPasswordAction = (token,password, confirmPassword) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reset-pw`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token,password, confirmPassword }),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch({ type: 'PASSWORD_RESET_SUCCESS', message: data.message }); // Dispatch an action for a successful token verification
        return { success: true };
      } else {
        const data = await response.json();
        dispatch({ type: 'PASSWORD_RESET_FAILURE' ,error: data.error});
      }
    } catch (error) {
      dispatch({ type: 'PASSWORD_RESET_FAILURE' });
    }
  };
};

export const qrCodeData = (qrCodeUrl)=>{
  return async (dispatch) => {
    try {
        dispatch({ type: 'SELECT_QR_CODE_DATA', qrCodeUrl: qrCodeUrl });
    } catch (error) {
      dispatch({ type: 'SELECT_QR_CODE_DATA' });
    }
  }
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


export const verifyMFA = (mfaToken,email) => {
  return async (dispatch) => {
    try {
      // Make the API call for MFA verification
      const response = await fetch(API_BASE_URL + "/user/mfa-verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mfaToken,email }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        localStorage.setItem('token', data.jwtToken);
        dispatch({ type: 'LOGIN_SUCCESS', payload: data });
        
        return { success: true };
      } else {
        const data = await response.json();
        dispatch({ type: 'LOGIN_FAILURE', error: data.error });
        return { success: false };
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
      return { success: false };
    }
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
  qrCodeData:null,
  email:null
};


const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      
      localStorage.setItem('token', action.payload.jwtToken); 
      return {
        ...state,
        user: action.payload.user,
        loggedIn: !isTokenExpired(action.payload.jwtToken), 
        error: null,
      };
    case 'LOGIN_FAILURE':

      return {
        ...state,
        user: null,
        loggedIn: false,
        error: action.error || 'Login failed',
      };
    case 'REGISTER_SUCCESS':
    return state; 
    case 'REGISTER_FAILURE':
      return {
        ...state,
        user: null,
        loggedIn: false,
        error: action.error || 'REGISTER_FAILURE',
      };
    case 'FORGET_PW_SUCCESS':
      return {
        ...state,
        user: null,
        loggedIn: false,
        message: action.message || 'FORGET_PW_SUCCESS',
      };  
    case 'FORGET_PW_FAIL':
      return {
        ...state,
        user: null,
        loggedIn: false,
        error: action.error || 'FORGET_PW_FAIL',
      };  
    case 'PASSWORD_RESET_SUCCESS':
      return {
        ...state,
        user: null,
        loggedIn: false,
        message: action.message || 'PASSWORD_RESET_SUCCESS',
      };  
    case 'PASSWORD_RESET_FAILURE':
      return {
        ...state,
        user: null,
        loggedIn: false,
        error: action.error || 'PASSWORD_RESET_FAILURE',
      };    
    case 'LOGOUT':
      
      return {
        ...state,
        user: null,
        loggedIn: false,
        error: null,
      };
    
    case 'SELECT_QR_CODE_DATA':
      return {
        ...state,
        qrCodeData: action.qrCodeUrl,
        email: action.email,
        
      };
    // Other cases as needed (e.g., additional actions related to user authentication)  
    default:
      return state;
  }
};
  
  

export default authReducer;
  
