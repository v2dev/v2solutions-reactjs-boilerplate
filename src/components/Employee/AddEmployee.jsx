import React, { useState } from 'react';
import API_ENDPOINTS from "../../configs/apiConfig"
import useCrudApi from "../../hooks/useCrudApi"

import { connect } from "react-redux"
import {
  addEmployee as addEmployeeAction,
} from "../../redux/employee"; // Import your actions
import { useDispatch } from "react-redux";



const EmployeeForm = (props) => {
  const apiEndpoint = API_ENDPOINTS.EMPLOYEES
  const dispatch = useDispatch();

  const {  postData } = useCrudApi(apiEndpoint)

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


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });

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

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // If no errors, the form is valid
  };

  const handleSubmit = async  (e) => {
    
    e.preventDefault();
    if (validateForm()) {
      try {
        
        const response = await postData(employeeData)
        
        if (response.ok) {
          dispatch(addEmployeeAction(response.data)); 
        } else {
          
          console.error('Failed to add employee');
        }
      } catch (error) {
        console.error('Error adding employee:', error);
      
      }  
    }
  };

  return (
    
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Employee Form</h2>
              <form onSubmit={handleSubmit}>
                
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
                    type="date"
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
                
                <button type="submit" className="btn btn-primary">Submit</button>
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
};
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeForm);
