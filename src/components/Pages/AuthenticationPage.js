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


  const clearForm = () => {
    setFormData({ name: '', email: '', password: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, name } = formData;

    // Simple form validation
    if (!email || !password || (!loginMode && !name)) {
      alert("Please fill in all the fields.");
      return;
    }

    if (loginMode) {
      const loginResult = await dispatch(login(email, password));
      if (loginResult &&  loginResult.success) {
        navigate("/"); // Redirect after successful login
      }
    } else {
      dispatch(register(email, password, name)); // Dispatch the register action
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

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
                      <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleInputChange} />
                    </div>
                  )}

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleInputChange} />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleInputChange} />
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
