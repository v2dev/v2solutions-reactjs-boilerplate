import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { verifyGoogleToken } from '../../../redux/authActions';
import { useDispatch } from 'react-redux';

const GoogleLoginButton = ({ onSuccess, onError }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const googleVerification = await dispatch(verifyGoogleToken(credentialResponse));

    if (googleVerification && googleVerification.success) {
      
      navigate('/');
    } else {
      // setError('MFA verification failed. Please try again.');
    }

  };

  return (
    <GoogleLogin
      onSuccess={handleGoogleLoginSuccess}
      onError={() => {
        console.log('Login Failed');
        if (onError) {
          onError('Login Failed');
        }
      }}
    />
  );
};

export default GoogleLoginButton;
