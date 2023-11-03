import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { forgetPassword } from "../../redux/auth";

function ForgetPasswordComponent() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please fill email.");
      return;
    }
    dispatch(forgetPassword(email));
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

                <form onSubmit={handleForgetPassword}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={email} onChange={handleInputChange} />
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
