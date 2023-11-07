import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../../redux/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';

function AuthenticationPage() {
  const dispatch = useDispatch();
  const { loggedIn, error } = useSelector(state => state.auth) || {};
  const [loginMode, setLoginMode] = useState(true);
  
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});


  const clearForm = () => {
    setFormData({ name: '', email: '', password: '' });
    setFormErrors({}); // Clear form errors

  };

  const validateForm = () => {
    const errors = {};
    
    // Validate each field
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format";
    }
  
    // Password validation
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      errors.password = "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number";
    }
  
    if (!loginMode && !formData.name) {
      errors.name = "Name is required for sign up";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // If no errors, the form is valid
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const { email, password, name } = formData;
      if (loginMode) {
        const loginResult = await dispatch(login(email, password));
        if (loginResult &&  loginResult.success) {
          navigate("/"); // Redirect after successful login
        }
      } else {
        dispatch(register(email, password, name)); // Dispatch the register action
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" }); 

  };

  const responseMessage = (response) => {
      console.log(response);
  };
  const errorMessage = (error) => {
      console.log(error);
  };
  
  const handleModeChange = (mode) => {
    setLoginMode(mode);
    clearForm(); // Clear form fields when changing mode
  };

  return (
    <div className="container mt-5">
      
      {!loggedIn ? (
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="text-center mb-4">{loginMode ? 'Login' : 'Sign Up'}</h2>

                <form onSubmit={handleSubmit}>
                  {error && <p className="text-danger text-center">{error}</p>}
                  {!loginMode && (
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input
                        type="text"
                        className={`form-control ${formErrors.name && "is-invalid"}`}
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        
                      />
                      <div className={`invalid-feedback ${formErrors.name ? "d-block" : ""}`}>
                        {formErrors.name}
                      </div>
                    </div>
                  )}

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="text"
                      className={`form-control ${formErrors.email && "is-invalid"}`}
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      
                    />
                    <div className={`invalid-feedback ${formErrors.email ? "d-block" : ""}`}>
                      {formErrors.email}
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      className={`form-control ${formErrors.password && "is-invalid"}`}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      
                    />
                    <div className={`invalid-feedback ${formErrors.password ? "d-block" : ""}`}>
                      {formErrors.password}
                    </div>
                  </div>

                  
                  <button type="submit" className="btn btn-primary">{loginMode ? 'Login' : 'Sign Up'}</button>
                </form>

                <p className="mt-3">
                  {loginMode
                    ? "Don't have an account? "
                    : 'Already have an account? '}
                  <Link ><span className="text-primary" onClick={() => handleModeChange(!loginMode)}>
                    {loginMode ? 'Sign Up' : 'Login'}
                  </span> | </Link>
                  <span className="text-primary ms-1">
                     <Link to="/forget-password" >Forget Password</Link>
                   </span>
                </p>

                <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
    

              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>User is logged in. Redirect or show authenticated content here.</p>
        // You can redirect or display authenticated content here after successful login.
      )}
    </div>
  );
}

export default AuthenticationPage;
