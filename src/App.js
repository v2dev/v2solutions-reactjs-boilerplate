import React from 'react';
import { RouterProvider } from 'react-router-dom';
import setupAxiosInterceptor from './interceptor/axiosInterceptor';
import setupRedux from './redux/reduxSetup';
import { routes } from './routes';
import { createBrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {

  // Setup Axios Interceptor
  setupAxiosInterceptor();

  // Setup Redux
  const dispatch = setupRedux();

  // Create Router by passing dispatch to routes
  const router = createBrowserRouter(routes(dispatch));

  // Return RouterProvider
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  return <GoogleOAuthProvider clientId={clientId}><RouterProvider router={router} /></GoogleOAuthProvider>;
}

export default App;
