// routes.js
import React from "react"
import HomePage from './components/Pages/HomePage';
import AuthenticationPage from './components/Pages/AuthenticationPage';
import ForgetPassword from './components/Pages/ForgetPassword';
import ResetPassword from './components/Pages/ResetPassword';
import MFAPage from './components/Pages/MFAPage';
import { checkAuthLoader } from './redux/authActions'
import RootLayout from "./components/Pages/RootLayout";
import NewEmployeeListPage from "./components/Pages/NewEmployeeListPage";

// Pass dispatch to checkAuthLoader
export const routes = (dispatch) => [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <HomePage />, loader: checkAuthLoader(dispatch) },
      { path: 'auth', element: <AuthenticationPage /> },
      { path: 'forgot-password', element: <ForgetPassword /> },
      { path: 'mfa', element: <MFAPage /> },
      { path: 'reset-password/:token?', element: <ResetPassword /> },
      { path: 'employee', element: <NewEmployeeListPage />, loader: checkAuthLoader(dispatch) }
    ],
  },
];
