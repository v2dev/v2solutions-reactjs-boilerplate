// routes.js
import React  from "react"
import RootLayout from './components/Pages/RootLayout';
import HomePage from './components/Pages/HomePage';
import EmployeeListPage from './components/Pages/EmployeeListPage';
import EmployeeFormPage from './components/Pages/EmployeeFormPage';
import AuthenticationPage from './components/Pages/AuthenticationPage';
import ForgetPassword from './components/Pages/ForgetPassword';
import ResetPassword from './components/Pages/ResetPassword';
import MFAPage from './components/Pages/MFAPage';
import {checkAuthLoader} from './redux/authActions'

// Pass dispatch to checkAuthLoader
export const routes = (dispatch) => [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <HomePage />, loader: checkAuthLoader(dispatch)},
      { path: 'employee', element: <EmployeeListPage />, loader: checkAuthLoader(dispatch) },
      { path: 'employee/add', element: <EmployeeFormPage />, loader: checkAuthLoader(dispatch) },
      { path: 'employee/edit/:id', element: <EmployeeFormPage />, loader: checkAuthLoader(dispatch) },
      { path: 'auth', element: <AuthenticationPage /> },
      { path: 'forgot-password', element: <ForgetPassword /> },
      { path: 'mfa', element: <MFAPage /> },
      { path: 'reset-password/:token?', element: <ResetPassword /> },
    ],
  },
];
