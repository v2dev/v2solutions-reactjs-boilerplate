// ResetPassword.test.js
/* eslint-disable no-undef */
 
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'; // You may need to install this

import ResetPassword from "../components/Pages/ResetPassword";

describe('ResetPassword component', () => {
  const mockStore = configureStore();
  const initialState = {
    auth: {
      error: null,
      message: null,
      // other auth-related state properties
    },
    // other slices
  };
  
  const store = mockStore(initialState);

  beforeEach(() => {
    render(
      <Provider store={store}>
        <ResetPassword />
      </Provider>
    );
  });

  it('renders Reset Password component', () => {
   
    expect(screen.queryByText('Reset Password')).toBeInTheDocument();
  });
  
  

});
