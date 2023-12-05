import { redirect } from "react-router-dom";
import API_BASE_URL from "../configs/apiBaseUrl"

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
        if(data.message){
          return { success: true }; 
        } 
      } else {
        const data = await response.json();
        
        dispatch({ type: 'LOGIN_FAILURE' ,error: data.error});
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
    }
  };
};
  
export const register = (email, password, name,country) => {
  return async (dispatch) => {
      try {
        console.log(country);
        const response = await fetch(API_BASE_URL + "/user/signup", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, name,country }),
        });
        
        if (response.ok) {
          dispatch({ type: 'REGISTER_SUCCESS' });
          const data = await response.json();
          if(data.qrCodeUrl){
            return { qrCodeUrl: data.qrCodeUrl }; 
          }else{
            dispatch({ type: 'REGISTER_FAILURE' ,error: data.error});
            return { error: true }; 
          }
        } else {
          
          const data = await response.json();
          
          dispatch({ type: 'REGISTER_FAILURE' ,error: data.error});
          return { error: true }; 
      }
      } catch (error) {
        dispatch({ type: 'REGISTER_FAILURE' });
        return { error: true }; 
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
      const response = await fetch(API_BASE_URL + "/user/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: 'FORGET_PW_SUCCESS',  message: data.message ,error:''});
        return { success: true }; 
      } else {
        const data = await response.json();
        
        dispatch({ type: 'FORGET_PW_FAIL' ,error: data.error});
        return { error: true }; 
      }
    } catch (error) {

      dispatch({ type: 'FORGET_PW_FAIL' });
      return { error: true }; 

    }
  };
};

export const resetPasswordAction = (otp,password, confirmPassword,token) => {

  return async (dispatch) => {
    try {
      let requestBody = { password, confirmPassword };

      // Conditionally add otp to the body if it is provided
      if (otp) {
        requestBody.otp = otp;
      }

      // Conditionally add token to the body if it is provided
      if (token) {
        requestBody.token = token;
      }

      const response = await fetch(`${API_BASE_URL}/user/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
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
  if(token){
    const decodedToken = decodeToken(token);
    if (decodedToken && decodedToken.exp) {
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      return decodedToken.exp < currentTime; // Check if expiration time is in the past
    }
    return true; // Treat the token as expired if it's invalid or doesn't contain expiration time
  }
};
