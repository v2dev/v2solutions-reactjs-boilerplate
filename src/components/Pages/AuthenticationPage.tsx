import React, { useState, ChangeEvent, FormEvent } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login, register } from "../../redux/authActions"
import { useNavigate, Link } from "react-router-dom"
import Footer from "../UI/Footer/Footer"
import GoogleLoginButton from "../Util/Google/GoogleLoginButton"
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material"
import { validateAuthenticationForm as validateFormHelper } from "../../helpers/formValidation"
import { regexPatterns, RegexType } from "../../helpers/regexPatterns"
const emailRegex = regexPatterns[RegexType.Email]
const passwordRegex = regexPatterns[RegexType.Password]

interface AuthenticationPageProps {}

interface FormData {
  name: string
  email: string
  password: string
  country: string
}

const AuthenticationPage: React.FC<AuthenticationPageProps> = () => {
  const dispatch = useDispatch()
  const { loggedIn, error } = useSelector((state) => state.auth) || {
    loggedIn: false,
    error: null,
  }
  const [loginMode, setLoginMode] = useState(true)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    country: "",
  })
  const navigate = useNavigate()
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})

  const clearForm = () => {
    setFormData({ name: "", email: "", password: "", country: "" })
    setFormErrors({})
  }

  const validateForm = () => {
    const errors = validateFormHelper(formData, loginMode)

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      const { email, password, name, country } = formData
      if (loginMode) {
        const loginResult = await dispatch(login(email, password))
        if (loginResult && loginResult.success) {
          dispatch({ type: "SELECT_QR_CODE_DATA", email })
          navigate("/mfa")
        }
      } else {
        const signupResult = await dispatch(register(email, password, name, country))

        if (!signupResult.error && signupResult.qrCodeUrl) {
          console.log(signupResult.qrCodeUrl)
          dispatch({
            type: "SELECT_QR_CODE_DATA",
            qrCodeUrl: signupResult.qrCodeUrl,
            email,
          })
          navigate("/mfa")
        } else {
          // dispatch({ type: 'REGISTER_FAILURE'});
        }
      }
    }
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | { name: string; value: string }>,
  ) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setFormErrors({ ...formErrors, [name]: "" })
  }

  const handleModeChange = (mode: boolean) => {
    setLoginMode(mode)
    clearForm()
  }

  return (
    <>
      <div
        className="wrapper"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <div id="content">
          <div className=" mt-5">
            {!loggedIn ? (
              <div className="row justify-content-center">
                <div className="card" style={{ width: "400px", margin: "auto" }}>
                  <div className="card-body">
                    <h2 className="text-center mb-4 display-6">
                      {loginMode ? "Login" : "Sign Up"}
                    </h2>

                    <form onSubmit={handleSubmit}>
                      {error && <p className="text-danger text-center">{error}</p>}
                      {!loginMode && (
                        <div className="mb-3">
                          <TextField
                            label="Name"
                            variant="outlined"
                            type="text"
                            className={`form-control ${
                              formErrors.name && "is-invalid"
                            }`}
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                          />
                          <div
                            className={`invalid-feedback ${
                              formErrors.name ? "d-block" : ""
                            }`}
                          >
                            {formErrors.name}
                          </div>
                        </div>
                      )}

                      {["email", "password"].map((field) => (
                        <div key={field} className="mb-3">
                          <TextField
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                            variant="outlined"
                            type={field === "password" ? "password" : "text"}
                            className={`form-control ${
                              formErrors[field] && "is-invalid"
                            }`}
                            id={field}
                            name={field}
                            value={formData[field]}
                            onChange={handleInputChange}
                          />
                          <div
                            className={`invalid-feedback ${
                              formErrors[field] ? "d-block" : ""
                            }`}
                          >
                            {formErrors[field]}
                          </div>
                        </div>
                      ))}

                      {!loginMode && (
                        <div className="mb-3">
                          <FormControl fullWidth>
                            <InputLabel id="country-select-label">
                              Country
                            </InputLabel>
                            <Select
                              value={formData.country}
                              onChange={(e) => handleInputChange(e)}
                              name="country"
                              label="Country"
                              labelId="country-select-label"
                            >
                              <MenuItem value="india">India</MenuItem>
                              <MenuItem value="usa">United States</MenuItem>
                            </Select>
                          </FormControl>
                          <div
                            className={`invalid-feedback ${
                              formErrors.country ? "d-block" : ""
                            }`}
                          >
                            {formErrors.country}
                          </div>
                        </div>
                      )}
                      <Button
                        color="primary"
                        variant="contained"
                        size="medium"
                        type="submit"
                      >
                        {loginMode ? "Login" : "Sign Up"}
                      </Button>
                    </form>

                    <p className="mt-3">
                      {loginMode
                        ? "Don't have an account? "
                        : "Already have an account? "}
                      <Link>
                        <span
                          className="text-primary"
                          onClick={() => handleModeChange(!loginMode)}
                        >
                          {loginMode ? "Sign Up" : "Login"}
                        </span>{" "}
                        |
                      </Link>
                      <span
                        className="text

-primary ms-1"
                      >
                        <Link to="/forgot-password">Forgot Password</Link>
                      </span>
                    </p>
                    <GoogleLoginButton />
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
  )
}

export default AuthenticationPage
