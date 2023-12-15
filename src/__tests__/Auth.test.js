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
import { GoogleOAuthProvider } from '@react-oauth/google';

const mockStore = configureMockStore();

describe('AuthenticationPage', () => {
    let store;
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

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
              <GoogleOAuthProvider clientId={clientId}>
                <AuthenticationPage />
                </GoogleOAuthProvider>
            </BrowserRouter>
          </Provider>
        );
      });

    test('renders signup form when "Sign Up" link is clicked', () => {
      const { getByText, getByLabelText } = render(
        <Provider store={store}>
          <BrowserRouter> {/* Wrap with BrowserRouter */}
            <GoogleOAuthProvider clientId={clientId}>
              <AuthenticationPage />
              </GoogleOAuthProvider>
          </BrowserRouter>
        </Provider>
      );
  
      fireEvent.click(getByText('Sign Up'));
    });
  });
  
