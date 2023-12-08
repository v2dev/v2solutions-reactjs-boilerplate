import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import API_ENDPOINTS from '../../configs/apiConfig';
import useCrudApi from '../../hooks/useCrudApi';
import { connect } from 'react-redux';
import { addEmployee as addEmployeeAction, updateEmployee as updateEmployeeAction } from '../../redux/employeeActions';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import BaseForm from '../UI/BaseForm/BaseForm';

const EmployeeForm = ({ addEmployee, updateEmployee, employees }) => {
  const apiEndpoint = API_ENDPOINTS.EMPLOYEES;
  const { postData, updateData, getData } = useCrudApi(apiEndpoint);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const inputConfig = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'text', required: true },
    { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
    { name: 'designation', label: 'Designation', type: 'text', required: true },
    { name: 'education', label: 'Education', type: 'text', required: true },
  ];

  const validationLogic = (formData) => {
    const errors = {};

    inputConfig.forEach((config) => {
      const { name, label, type, required } = config;

      if (required && (!formData[name] || formData[name].trim() === '')) {
        errors[name] = `${label} is required`;
      }

      if (type === 'date' && formData[name]) {
        const today = moment();
        const dob = moment(formData[name], 'YYYY-MM-DD');
        const isDobValid = today.diff(dob, 'years') >= 18;

        if (!isDobValid) {
          errors[name] = 'Must be at least 18 years old.';
        }
      }
    });

    return errors;
  };

  const handleSubmit = async (formData) => {
    try {
      const response = id ? await updateData(`${id}`, formData) : await postData(formData);
      if (response.error) {
        // Handle error
      } else {
        const action = id ? updateEmployee : addEmployee;
        action(response.data);
        setSuccessMessage(`Employee ${id ? 'updated' : 'added'} successfully.`);
        navigate('/employee', { state: { successMessage } });
      }
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">{id ? 'Edit Employee' : 'Add Employee'}</h2>
              <BaseForm
                inputConfig={inputConfig}
                validationLogic={validationLogic}
                onSubmit={handleSubmit}
                navigate={() => navigate('/employee')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const mapStateToProps = (state) => ({
  employees: state.employees,
});

const mapDispatchToProps = {
  addEmployee: addEmployeeAction,
  updateEmployee: updateEmployeeAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeForm);
