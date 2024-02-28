import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { resetPasswordAction } from "../../redux/authActions"
import { useParams } from "react-router-dom"
import Header from "../UI/Header/Header"
import { Button, TextField } from "@mui/material"
import { Link } from "react-router-dom"
import { regexPatterns, RegexType } from "../../helpers/regexPatterns"
import formValidation from "../../helpers/formValidation"

const passwordRegex = regexPatterns[RegexType.Password]

const ResetPassword: React.FC = () => {
  const dispatch = useDispatch()
  const { token } = useParams()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [formErrors, setFormErrors] = useState({})

  const tokenPresent = !!token

  const error = useSelector((state) => state.auth.error)
  const message = useSelector((state) => state.auth.message)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === "password") {
      setPassword(value)
    } else if (name === "confirmPassword") {
      setConfirmPassword(value)
    } else if (name === "otp") {
      setOtp(value)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      dispatch(resetPasswordAction(otp, password, confirmPassword, token))
    }
  }

  const validateForm = () => {
    const formData = { otp, password, confirmPassword }
    const errors = formValidation.validateResetPasswordForm(formData, tokenPresent)

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  useEffect(() => {
    if (tokenPresent) {
      setOtp("")
    }
  }, [tokenPresent])

  return (
    <div className="wrapper">
      <div id="content">
        <div className="mt-5">
          <div className="row justify-content-center">
            <div className="col-md-4">
              <div className="card" style={{ width: "400px", margin: "auto" }}>
                <div className="card-body txt">
                  <h2 className="text-center mb-4">Reset Password</h2>

                  <form onSubmit={handleResetPassword}>
                    {error && <p className="text-danger text-center">{error}</p>}
                    {message && (
                      <p className="text-success text-center">{message}</p>
                    )}

                    {!tokenPresent && (
                      <div className="mb-3">
                        <label htmlFor="otp" className="form-label">
                          OTP
                        </label>
                        <input
                          type="number"
                          className={`form-control ${
                            formErrors.otp && "is-invalid"
                          }`}
                          id="otp"
                          name="otp"
                          value={otp}
                          onChange={handleInputChange}
                        />
                        <div
                          className={`invalid-feedback ${
                            formErrors.otp ? "d-block" : ""
                          }`}
                        >
                          {formErrors.otp}
                        </div>
                      </div>
                    )}

                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        New Password
                      </label>
                      <input
                        type="password"
                        className={`form-control ${
                          formErrors.password && "is-invalid"
                        }`}
                        id="password"
                        name="password"
                        value={password}
                        onChange={handleInputChange}
                      />
                      <div
                        className={`invalid-feedback ${
                          formErrors.password ? "d-block" : ""
                        }`}
                      >
                        {formErrors.password}
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="confirmPassword" className="form-label">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        className={`form-control ${
                          formErrors.confirmPassword && "is-invalid"
                        }`}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleInputChange}
                      />
                      <div
                        className={`invalid-feedback ${
                          formErrors.confirmPassword ? "d-block" : ""
                        }`}
                      >
                        {formErrors.confirmPassword}
                      </div>
                    </div>

                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </form>
                  <span className="text-primary d-block mt-2 ms-1">
                    <Link to="/auth">Back to Login</Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
