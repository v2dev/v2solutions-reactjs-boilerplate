/* eslint-disable no-unused-vars */
import React ,{ useState } from "react"

import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../../redux/auth';

function AuthenticationPage() {
  const dispatch = useDispatch();
  const { loggedIn, error } = useSelector(state => state.auth) || {};
  const [loginMode, setLoginMode] = useState(true); 
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loginMode) {
      const { email, password } = formData;
      dispatch(login(email, password));
    } else {
      const { name, email, password } = formData;
      dispatch(register(email, password, name));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">{loginMode ? 'Login' : 'Sign Up'}</h2>
              {error && <p className="text-danger">{error}</p>}

              <form onSubmit={handleSubmit}>
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
                 <span className="text-primary" onClick={() => setLoginMode(!loginMode)}>
                  {loginMode ? 'Sign Up' : 'Login'}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthenticationPage;


