import React from 'react';
import { RouterProvider } from 'react-router-dom';
import setupAxiosInterceptor from './interceptor/axiosInterceptor';
import setupRedux from './redux/reduxSetup';
import { routes } from './routes';
import { createBrowserRouter } from 'react-router-dom';

function App() {
  // Setup Axios Interceptor
  setupAxiosInterceptor();

  // Setup Redux
  const dispatch = setupRedux();

  // Create Router by passing dispatch to routes
  const router = createBrowserRouter(routes(dispatch));

  // Return RouterProvider
  return <RouterProvider router={router} />;
}

export default App;
