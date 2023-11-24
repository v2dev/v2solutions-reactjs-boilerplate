import React, { useState, useEffect } from 'react';
import API_ENDPOINTS from '../../configs/apiConfig';
import useCrudApi from '../../hooks/useCrudApi';
import { connect } from 'react-redux';
import { addEmployee as addEmployeeAction, updateEmployee as updateEmployeeAction } from '../../redux/employee';
import { useNavigate, useParams } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const EmployeeForm = ({ addEmployee, updateEmployee, employees }) => {
  const apiEndpoint = API_ENDPOINTS.EMPLOYEES;
  const { postData, updateData, getData } = useCrudApi(apiEndpoint);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const [employeeData, setEmployeeData] = useState({
    emp_id: '',
    name: '',
    email: '',
    dob: '',
    designation: '',
    education: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (id) {
      fetchEmployeeData();
    }
  }, [id, employees, navigate]);

  const fetchEmployeeData = async () => {
    try {
      const response = await getData(`/${id}`);
      if (response && !response.error) {
        const formattedEmployeeData = { ...response };
        setEmployeeData(formattedEmployeeData);
        setIsEdit(true);
      } else {
        navigate('/employee');
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
      navigate('/employee');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
    setFormErrors({ ...formErrors, [name]: name === 'dob' && !value.match(/^\d{4}-\d{2}-\d{2}$/) ? 'Invalid date format. Use YYYY-MM-DD' : '' });
  };

  const validateForm = () => {
    const errors = {};
    ['name', 'email', 'dob', 'designation', 'education'].forEach((field) => {
      if (!employeeData[field]) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = isEdit ? await updateData(`${id}`, employeeData) : await postData(employeeData);
        if (response.error) {
          setErrorMessage(response.error);
        } else {
          const action = isEdit ? updateEmployee : addEmployee;
          action(response.data);
          setSuccessMessage(`Employee ${isEdit ? 'updated' : 'added'} successfully.`);
          navigate('/employee', { state: { successMessage: `Employee ${isEdit ? 'updated' : 'added'} successfully.` } });
          setEmployeeData({ emp_id: '', name: '', email: '', dob: '', designation: '', education: '' });
        }
      } catch (error) {
        console.error(`Error ${isEdit ? 'updating' : 'adding'} employee:`, error);
        setErrorMessage(`Failed to ${isEdit ? 'update' : 'add'} employee. Please try again.`);
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">{isEdit ? 'Edit Employee' : 'Add Employee'}</h2>
              <form onSubmit={handleSubmit}>
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                {['name', 'email', 'dob', 'designation', 'education'].map((field) => (
                  <div key={field} className="mb-3">
                    <label htmlFor={field} className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                    <input
                      type={field === 'dob' ? 'text' : 'text'}
                      className={`form-control ${formErrors[field] ? 'is-invalid' : ''}`}
                      id={field}
                      name={field}
                      value={employeeData[field]}
                      onChange={handleInputChange}
                    />
                    {formErrors[field] && <div className={`invalid-feedback ${formErrors[field] ? 'd-block' : ''}`}>{formErrors[field]}</div>}
                  </div>
                ))}

                <button type="submit" className="btn btn-primary">
                  {isEdit ? 'Update' : 'Add'}
                </button>
              </form>
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
