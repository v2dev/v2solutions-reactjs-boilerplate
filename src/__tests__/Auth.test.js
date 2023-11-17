/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
// src/__tests__/Auth.test.js

import '@testing-library/jest-dom';
import React from 'react';

import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import AuthenticationPage from '../components/Pages/AuthenticationPage';
import { BrowserRouter } from 'react-router-dom';

const mockStore = configureMockStore();

describe('AuthenticationPage', () => {
    let store;
  
    beforeEach(() => {
      store = mockStore({
        auth: {
          loggedIn: false,
          error: null,
        },
      });
    });
    test('renders login form by default', () => {
        const { getByText, getByLabelText } = render(
          <Provider store={store}>
            <BrowserRouter>
              <AuthenticationPage />
            </BrowserRouter>
          </Provider>
        );
      });

    test('renders signup form when "Sign Up" link is clicked', () => {
      const { getByText, getByLabelText } = render(
        <Provider store={store}>
          <BrowserRouter> {/* Wrap with BrowserRouter */}
            <AuthenticationPage />
          </BrowserRouter>
        </Provider>
      );
  
      fireEvent.click(getByText('Sign Up'));
    });
  });
  
