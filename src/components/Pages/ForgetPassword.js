import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { forgetPassword } from "../../redux/auth";
import { useNavigate } from 'react-router-dom';

function ForgetPasswordComponent() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const error = useSelector(state => state.auth.error);
  const message = useSelector(state => state.auth.message);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate(); 
  const handleForgetPassword = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(forgetPassword(email));
      
      setEmail('')
      navigate('/reset-password');
    }
    

  };

  const validateForm = () => {
    const errors = {};
    
    // Validate each field
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      errors.email = "Invalid email format";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0; // If no errors, the form is valid
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="container mt-5">
        <div className="row justify-content-center">
        <div className="col-md-4">
            <div className="card">
            <div className="card-body">
                <h2 className="text-center mb-4">Forget Password</h2>
                {error && <p className="text-danger text-center">{error}</p>}
                {message && <p className="text-success text-center">{message}</p>}
                
                <form onSubmit={handleForgetPassword}>
                <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className={`form-control ${formErrors.email && "is-invalid"}`}
                      id="email"
                      name="email"
                      value={email}
                      onChange={handleInputChange}
                      
                    />
                    <div className={`invalid-feedback ${formErrors.email ? "d-block" : ""}`}>
                      {formErrors.email}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <Link to="/auth" >Back to Login</Link>
            </div>
            </div>
        </div>
        </div>
    </div>
  );
}

export default ForgetPasswordComponent;
