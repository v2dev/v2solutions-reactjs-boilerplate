import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../../redux/authActions';
import { useNavigate, Link } from 'react-router-dom';
import Header from "../UI/Header/Header"
import Footer from "../UI/Footer/Footer"

function AuthenticationPage() {
  const dispatch = useDispatch();
  const { loggedIn, error } = useSelector((state) => state.auth) || {};
  const [loginMode, setLoginMode] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});

  const clearForm = () => {
    setFormData({ name: '', email: '', password: '' });
    setFormErrors({});
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^((?:[^<>()\[\]\\.,;:\s@"]+(?:\.[^<>()\[\]\\.,;:\s@"]+)*)|(?:".+"))@(?:(?:\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|((?:[a-zA-Z\-0-9]+\.)+([a-zA-Z]{2,})))$/;
    if (!formData.email) {
      errors.email = 'Please enter email';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Invalid email format';
    }
    const passwordRegex = /^[ -~]{6,128}$/;
    // 
    if (!formData.password) {
      errors.password = 'Please enter password';
    } else if (!passwordRegex.test(formData.password)) {
      errors.password =
        'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number';
    }
    if (!loginMode && !formData.name) {
      errors.name = 'Please enter name ';
    }
    if (!loginMode && !formData.country) {
      errors.country = 'Please select country';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const { email, password, name } = formData;
      if (loginMode) {
        const loginResult = await dispatch(login(email, password));
        if (loginResult && loginResult.success) {
          dispatch({ type: 'SELECT_QR_CODE_DATA',email:email });
          navigate('/mfa');
        }

      } else {
        const signupResult = await  dispatch(register(email, password, name));

        if (!signupResult.error && signupResult.qrCodeUrl) {
          console.log(signupResult.qrCodeUrl);
          dispatch({ type: 'SELECT_QR_CODE_DATA', qrCodeUrl: signupResult.qrCodeUrl,email:email });
          navigate('/mfa');
        }else{
          // dispatch({ type: 'REGISTER_FAILURE'});
        }


      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };


  const handleModeChange = (mode) => {
    setLoginMode(mode);
    clearForm();
  };

  return (
    <>
    <div className="wrapper">
      <Header />
        <div id="content">
        <div className="container mt-5">
          {!loggedIn ? (
            <div className="row justify-content-center">
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h2 className="text-center mb-4 display-6">{loginMode ? 'Login' : 'Sign Up'}</h2>

                    <form onSubmit={handleSubmit}>
                      {error && <p className="text-danger text-center">{error}</p>}
                      {!loginMode && (
                        <div className="mb-3">
                          <label htmlFor="name" className="form-label">
                            Name
                          </label>
                          <input
                            type="text"
                            className={`form-control ${formErrors.name && 'is-invalid'}`}
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                          />
                          <div className={`invalid-feedback ${formErrors.name ? 'd-block' : ''}`}>
                            {formErrors.name}
                          </div>
                        </div>
                      )}

                      {['email', 'password'].map((field) => (
                        <div key={field} className="mb-3">
                          <label htmlFor={field} className="form-label">
                            {field.charAt(0).toUpperCase() + field.slice(1)}
                          </label>
                          <input
                            type={field === 'password' ? 'password' : 'text'}
                            className={`form-control ${formErrors[field] && 'is-invalid'}`}
                            id={field}
                            name={field}
                            value={formData[field]}
                            onChange={handleInputChange}
                          />
                          <div className={`invalid-feedback ${formErrors[field] ? 'd-block' : ''}`}>
                            {formErrors[field]}
                          </div>
                        </div>
                      ))}

                      {!loginMode && (
                        <div className="mb-3">
                        <label htmlFor="country" className="form-label">
                          Country
                        </label>
                        <select
                          className={`form-select ${formErrors.country && 'is-invalid'}`}
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                        >
                          <option value="">Select Country</option>
                          <option value="india">India</option>
                          <option value="usa">United States</option>
                          {/* Add more options as needed */}
                        </select>
                        <div className={`invalid-feedback ${formErrors.country ? 'd-block' : ''}`}>
                          {formErrors.country}
                        </div>
                      </div>
                      
                      )}



                      <button type="submit" className="btn btn-primary">
                        {loginMode ? 'Login' : 'Sign Up'}
                      </button>
                    </form>

                    <p className="mt-3">
                      {loginMode ? "Don't have an account? " : 'Already have an account? '}
                      <Link>
                        <span className="text-primary" onClick={() => handleModeChange(!loginMode)}>
                          {loginMode ? 'Sign Up' : 'Login'}
                        </span>{' '}
                        |
                      </Link>
                      <span className="text-primary ms-1">
                        <Link to="/forget-password">Forget Password</Link>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>User is logged in. Redirect or show authenticated content here.</p>
          )}
          </div>  
        </div>
      
    </div> 
    <Footer />
    </> 
  );
}

export default AuthenticationPage;
