import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { verifyTokenAction } from "../../redux/auth";
function ResetPassword() {
    // { token }
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    // Dispatch an action to verify the token
    dispatch(verifyTokenAction(token));

  }, [dispatch, token]);

  const handleResetPassword = async () => {
    // Dispatch an action to reset the password
    // Pass 'password' and 'confirmPassword' to the action
    // dispatch(resetPasswordAction(password, confirmPassword));
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
