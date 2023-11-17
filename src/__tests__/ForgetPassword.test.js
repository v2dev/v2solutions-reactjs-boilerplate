/* eslint-disable no-undef */
// Import necessary libraries and components
import '@testing-library/jest-dom';
import React from 'react';

import { render, fireEvent,  screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ForgetPassword from "../components/Pages/ForgetPassword";
import configureMockStore from 'redux-mock-store';

// Mock Redux store
const mockStore = configureMockStore();

describe('ForgetPassword', () => {
    let store;
  
    beforeEach(() => {
      store = mockStore({
        auth: {
          error: null,
          message: null,
        },
      });
    });
  
    test('submits Forget Password form with valid email', async () => {
      render(
        <Provider store={store}>
          <Router>
            <Routes>
              <Route path="/*" element={<ForgetPassword />} />
            </Routes>
          </Router>
        </Provider>
      );
      fireEvent.change(screen.getByRole('textbox', { name: /email/i }), { target: { value: 'test@example.com' } });
      fireEvent.submit(screen.getByText('Submit'));
      
    });
  });
  
  