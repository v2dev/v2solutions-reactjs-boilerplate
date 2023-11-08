import React, { useState, useEffect } from 'react';
import API_ENDPOINTS from "../../configs/apiConfig"
import useCrudApi from "../../hooks/useCrudApi"

import { connect } from "react-redux"
import { addEmployee as addEmployeeAction, updateEmployee as updateEmployeeAction } from "../../redux/employee";
import { useNavigate, useParams } from 'react-router-dom';


const EmployeeForm = ({ addEmployee, updateEmployee, employees }) => {

  const apiEndpoint = API_ENDPOINTS.EMPLOYEES
  // const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const { postData, updateData,getData } = useCrudApi(apiEndpoint);

  const [employeeData, setEmployeeData] = useState({
    emp_id: '',
    name: '',
    email: '',
    dob: '',
    designation: '',
    education: '',
    address: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (id) {
      fetchEmployeeData();
    }
  }, [id, employees, navigate]);

  const fetchEmployeeData = async () => {
    try {
      const response = await getData(`/${id}`); // Use the API to fetch employee data by ID
      if (response && !response.error) {
        const formattedEmployeeData = { ...response };
        formattedEmployeeData.dob = new Date(response.dob).toISOString().split('T')[0]; // Format the date here
        setEmployeeData(formattedEmployeeData);
        setIsEdit(true); // Set the form as in "edit" mode
      } else {
        // Handle when the employee with the given 'id' is not found
        // navigate('/'); // Redirect to the list page or show an error page
      }
    } catch (error) {
      // Handle the API request error
      console.error("Error fetching employee data:", error);
      // navigate('/'); // Redirect to the list page or show an error page
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setEmployeeData({ ...employeeData, [name]: value });
    if (name === 'dob') {
      
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!value.match(dateRegex)) {
        setFormErrors({ ...formErrors, [name]: 'Invalid date format. Use YYYY-MM-DD' });
      } else {
        setFormErrors({ ...formErrors, [name]: '' });
      }
    } else {
      setFormErrors({ ...formErrors, [name]: '' });
    }
    

    setFormErrors({ ...formErrors, [name]: '' });
  };


  const validateForm = () => {
    const errors = {};

    // Validate each field
    
    if (!employeeData.name) {
      errors.name = "Name is required";
    }
    if (!employeeData.email) {
      errors.email = "Email is required";
    }
    if (!employeeData.dob) {
      errors.dob = "Date of Birth is required";
    }
    if (!employeeData.designation) {
      errors.designation = "Designation is required";
    }
    if (!employeeData.education) {
      errors.education = "Education is required";
    }
    if (!employeeData.address) {
      errors.address = "Address is required";
    }
    
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!employeeData.dob.match(dateRegex)) {
      errors.dob = 'Invalid date format. Use YYYY-MM-DD';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // If no errors, the form is valid
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        let response;
        if (isEdit) {
          response = await updateData(`${id}`,employeeData);
          updateEmployee(response.data);
        } else {
          response = await postData(employeeData);
          addEmployee(response.data);
        }

        setEmployeeData({
          emp_id: '',
          name: '',
          email: '',
          dob: '',
          designation: '',
          education: '',
          address: '',
        });

        // Show success message and redirect after adding/editing the employee
        navigate('/', { state: { successMessage: 'Employee added/updated successfully' } });
      } catch (error) {
        console.error('Error adding/updating employee:', error);
        // Handle error scenarios, e.g., show an error message
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

                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className={`form-control ${formErrors.name ? "is-invalid" : ""}`}
                    id="name"
                    name="name"
                    value={employeeData.name}
                    onChange={handleInputChange}
                  />
                  {formErrors.name && <div className={`invalid-feedback ${formErrors.name ? "d-block" : ""}`}>{formErrors.name}</div>}
        
                </div>
                
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
                    id="email"
                    name="email"
                    value={employeeData.email}
                    onChange={handleInputChange}
                  />
                  {formErrors.email && <div className={`invalid-feedback ${formErrors.email ? "d-block" : ""}`}>{formErrors.email}</div>}
        
                </div>
                <div className="mb-3">
                  <label htmlFor="dob" className="form-label">Date of Birth</label>
                  <input
                    type="text"
                    className={`form-control ${formErrors.dob ? "is-invalid" : ""}`}
                    id="dob"
                    name="dob"
                    value={employeeData.dob}
                    onChange={handleInputChange}
                  />
                  {formErrors.dob && <div className={`invalid-feedback ${formErrors.dob ? "d-block" : ""}`}>{formErrors.dob}</div>}
        
                </div>
                <div className="mb-3">
                  <label htmlFor="designation" className="form-label">Designation</label>
                  <input
                    type="text"
                    className={`form-control ${formErrors.designation ? "is-invalid" : ""}`}
                    id="designation"
                    name="designation"
                    value={employeeData.designation}
                    onChange={handleInputChange}
                  />
                  {formErrors.designation && <div className={`invalid-feedback ${formErrors.designation ? "d-block" : ""}`}>{formErrors.designation}</div>}
        
                </div>
                <div className="mb-3">
                  <label htmlFor="education" className="form-label">Education</label>
                  <input
                    type="text"
                    className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
                    id="education"
                    name="education"
                    value={employeeData.education}
                    onChange={handleInputChange}
                  />
                  {formErrors.education && <div className={`invalid-feedback ${formErrors.education ? "d-block" : ""}`}>{formErrors.education}</div>}
        
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input
                    type="text"
                    className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
                    id="address"
                    name="address"
                    value={employeeData.address}
                    onChange={handleInputChange}
                  />
                  {formErrors.address && <div className={`invalid-feedback ${formErrors.address ? "d-block" : ""}`}>{formErrors.address}</div>}
        
                </div>
                
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
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
})
const mapDispatchToProps = {
  addEmployee: addEmployeeAction,
  updateEmployee: updateEmployeeAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeForm);
