import React from 'react';
import { RouterProvider } from 'react-router-dom';
import setupAxiosInterceptor from './interceptor/axiosInterceptor';
import { routes } from './routes';
import { createBrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useDispatch } from 'react-redux';

const App: React.FC = () => {

  // Setup Axios Interceptor
  setupAxiosInterceptor();

  // Setup Redux
  const dispatch = useDispatch();// setupRedux();

  // Create Router by passing dispatch to routes
  const router = createBrowserRouter(routes(dispatch));

  // Return RouterProvider
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID as string;
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
}

export default App;
