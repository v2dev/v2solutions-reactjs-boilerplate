import React  from "react"
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/Pages/RootLayout";
// import ErrorPage from "./components/Pages/ErrorPage";
import TodoPage from "./components/Pages/TodoPage";
import AuthenticationPage from "./components/Pages/AuthenticationPage";
import {checkAuthLoader} from './redux/auth'
import { useDispatch } from 'react-redux';

import axios from 'axios';

function App() {

  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  const dispatch = useDispatch();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      // errorElement: <ErrorPage />,
      children: [
        {
          index: true,  // Define your protected route
          element: <TodoPage />,
          loader:checkAuthLoader(dispatch)
          
        },
        {
          path: "auth",
          element: <AuthenticationPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App


