import { useRouteError } from 'react-router-dom';
import React from "react"

const ErrorPage: React.FC = () => {
  const error = useRouteError();

  let title = 'An error occurred!';
  let message = 'Something went wrong!';

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = 'Not found!';
    message = 'Could not find resource or page.';
  }

  return (
    <React.Fragment>
      <h1>{title}</h1>
      <p>{message}</p>
    </React.Fragment>
  );
}

export default ErrorPage;
