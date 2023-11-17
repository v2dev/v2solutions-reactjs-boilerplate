 /* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddEmployee from '../components/Employee/AddEmployee'
import { BrowserRouter as Router } from 'react-router-dom'; // Import the BrowserRouter
import { act } from 'react-dom/test-utils'; // Import act
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

// Mock the redux store
const mockStore = configureMockStore();

describe('AddEmployee', () => {
  test('renders the component', () => {
    // Create a mock store
    const store = mockStore({
      employees: [], // Add any necessary initial state here
    });

    render(
      <Provider store={store}>
        <Router>
          <AddEmployee />
        </Router>
      </Provider>
    );

    // Assert that the component renders without crashing
    expect(screen.getByText('Add Employee')).toBeInTheDocument();
  });
});
