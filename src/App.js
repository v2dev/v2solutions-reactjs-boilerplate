import React from "react"
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/pages/RootLayout";
import ErrorPage from "./components/pages/ErrorPage";
import TodoPage from "./components/pages/TodoPage";

import { checkAuthLoader, tokenLoader } from "./util/auth";
import AuthenticationPage, {
  action as authAction,
} from "./components/pages/AuthenticationPage";
// import { action as logoutAction } from "./pages/Logout";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: tokenLoader,
    children: [
      {
        index: true, 
        element: <TodoPage />,
        loader: checkAuthLoader,
      },
      {
        path: "auth",
        element: <AuthenticationPage />,
        action: authAction,
      },
      // {
      //   path: "/logout",
      //   action: logoutAction,
      // },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App


