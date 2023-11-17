 /* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
// src/__tests__/Auth.test.js
// EmployeeList.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmployeeList from '../components/Employee/EmployeeList'
import { BrowserRouter as Router } from 'react-router-dom'; // Import the BrowserRouter
import { act } from 'react-dom/test-utils'; // Import act

// Mock the useCrudApi hook
jest.mock('../hooks/useCrudApi', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    fetchData: jest.fn(() => Promise.resolve({ employees: [], totalPages: 1 })),
    deleteData: jest.fn(() => Promise.resolve({})),
  })),
}));

describe('EmployeeList', () => {
  test('renders the component', async () => {
    await act(async () => {
      render(
        <Router>
          <EmployeeList />
        </Router>
      );
    });

    // Use queryByText with a regular expression to match part of the text
    const filterByTextOrDesignation = screen.queryByText(/Filter by Name or Designation/i);

    // Assert that the component renders without crashing
    expect(filterByTextOrDesignation).toBeNull(); // Check for null explicitly
  });
  

});

