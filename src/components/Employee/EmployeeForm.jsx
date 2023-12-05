import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import API_ENDPOINTS from '../../configs/apiConfig';
import useCrudApi from '../../hooks/useCrudApi';
import { connect } from 'react-redux';
import { addEmployee as addEmployeeAction, updateEmployee as updateEmployeeAction } from '../../redux/employeeActions';
import { Link, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

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

  const [dobDatePicker, setDobDatePicker] = useState(null);

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
        const dobDate = moment(formattedEmployeeData.dob, 'YYYY-MM-DD').toDate();
        setDobDatePicker(dobDate);
  
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

    // Validate dob with moment.js for both formats (YYYY-MM-DD and DD-MM-YYYY)
    const isValidDob = moment(value, ['YYYY-MM-DD'], true).isValid();

    setEmployeeData({ ...employeeData, [name]: value });
    setFormErrors({
      ...formErrors,
      [name]: name === 'dob' && !isValidDob ? 'Invalid date format. Use dd-mm-yyyy ' : '',
    });
  };

  const handleDateChange = (date) => {
    const selectedDate = moment(date).format('YYYY-MM-DD');
  
    // Validate dob to be at least 18 years ago
    const today = moment();
    const dob = moment(selectedDate);
    const isDobValid = today.diff(dob, 'years') >= 18;
  
    setEmployeeData({ ...employeeData, dob: selectedDate });
    setFormErrors({
      ...formErrors,
      dob: isDobValid ? '' : 'Employee must be at least 18 years old.',
    });
  
    setDobDatePicker(date);
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
                    {field === 'dob' ? (
                      <DatePicker
                        selected={dobDatePicker}
                        onChange={handleDateChange}
                        className={`form-control ${formErrors[field] ? 'is-invalid' : ''}`}
                        dateFormat="dd-MM-yyyy"
                      />
                    ) : (
                      <input
                        type="text"
                        className={`form-control ${formErrors[field] ? 'is-invalid' : ''}`}
                        id={field}
                        name={field}
                        value={employeeData[field]}
                        onChange={handleInputChange}
                      />
                    )}
                    {formErrors[field] && <div className={`invalid-feedback ${formErrors[field] ? 'd-block' : ''}`}>{formErrors[field]}</div>}
                  </div>
                ))}

                <div className="d-flex justify-content-between">
                  <Link to="/employee" className="btn btn-danger">
                    Cancel
                  </Link>
                  <button type="submit" className="btn btn-primary">
                    {isEdit ? 'Update' : 'Add'}
                  </button>
                </div>
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
