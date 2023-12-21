import React from 'react';
import ListBase from '../UI/ListBase/ListBase';
import API_ENDPOINTS from '../../configs/apiConfig';

const EmployeeList = () => {

  const employeeListColumns = [
    { key: 'name', label: 'Name', type: 'string' },
    { key: 'email', label: 'Email', type: 'string' },
    { key: 'dob', label: 'Date of Birth', type: 'date' },
    { key: 'designation', label: 'Designation', type: 'string' },
    { key: 'education', label: 'Education', type: 'string' },
  ];
  


  return (
    <ListBase

      apiEndpoint={API_ENDPOINTS.EMPLOYEES}
      listColumns={employeeListColumns}
      editRoutePattern="/employee/edit" // Provide your custom edit route pattern
    />
  );
};

export default EmployeeList;
