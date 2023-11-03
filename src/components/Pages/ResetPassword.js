import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordAction } from "../../redux/auth";
import { useParams } from 'react-router-dom';

function ResetPassword() {
    // { token }
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  let { token } = useParams();
  const error = useSelector(state => state.auth.error);
  const message = useSelector(state => state.auth.message);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    // Dispatch an action to reset the password
    // Pass 'password' and 'confirmPassword' to the action
    if (!password && !confirmPassword) {
      alert("Please fill password .");
      return;
    }
    dispatch(resetPasswordAction(token,password, confirmPassword));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'password') {
      setPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Reset Password</h2>

              <form onSubmit={handleResetPassword}>
                {error && <p className="text-danger text-center">{error}</p>}
                {message && <p className="text-success text-center">{message}</p>}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">New Password</label>
                  <input type="password" className="form-control" id="password" name="password" value={password} onChange={handleInputChange} />
                </div>

                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={handleInputChange} />
                </div>

                <button type="submit" className="btn btn-primary">Reset Password</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
