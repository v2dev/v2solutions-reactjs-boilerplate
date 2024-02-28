import { regexPatterns, RegexType } from "./regexPatterns";

const emailRegex = regexPatterns[RegexType.Email];
const passwordRegex = regexPatterns[RegexType.Password];

interface AuthenticationFormData {
  name?: string;
  email?: string;
  password?: string;
  country?: string;
}

interface ForgetPasswordFormData {
  email?: string;
}

interface ResetPasswordFormData {
  otp?: string;
  password?: string;
  confirmPassword?: string;
}

interface EmployeeFormData {
    name?: string;
    email?: string;
    dob?: string;
    designation?: string;
    education?: string;
  }

interface FormErrors {
  [key: string]: string;
}

export const validateAuthenticationForm = (
  formData: AuthenticationFormData,
  loginMode: boolean
): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.email) {
    errors.email = "Please enter email";
  } else if (!emailRegex.test(formData.email)) {
    errors.email = "Invalid email format";
  }

  if (!formData.password) {
    errors.password = "Please enter password";
  } else if (!passwordRegex.test(formData.password)) {
    errors.password =
      "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number";
  }

  if (!loginMode && !formData.name) {
    errors.name = "Please enter name";
  }

  if (!loginMode && !formData.country) {
    errors.country = "Please select country";
  }

  return errors;
};

export const validateForgetPasswordForm = (
  formData: ForgetPasswordFormData
): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(formData.email)) {
    errors.email = "Invalid email format";
  }

  return errors;
};

export const validateResetPasswordForm = (
  formData: ResetPasswordFormData,
  tokenPresent: boolean
): FormErrors => {
  const errors: FormErrors = {};

  if (!tokenPresent && !formData.otp) {
    errors.otp = "OTP is required";
  }

  if (!formData.password) {
    errors.password = "Password is required";
  } else if (!passwordRegex.test(formData.password)) {
    errors.password =
      "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number";
  }

  if (!formData.confirmPassword) {
    errors.confirmPassword = "Confirm Password is required";
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Confirm Password does not match";
  }

  return errors;
};

export const validateEmployeeForm = (formData: EmployeeFormData): FormErrors => {
    const errors: FormErrors = {};
  
    if (!formData.name) {
      errors.name = "Name is required";
    }
  
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format";
    }
  
    if (!formData.dob) {
      errors.dob = "Date of Birth is required";
    }
  
    if (!formData.designation) {
      errors.designation = "Designation is required";
    }
  
    if (!formData.education) {
      errors.education = "Education is required";
    }
  
    return errors;
  };
  
export default {
  validateAuthenticationForm,
  validateForgetPasswordForm,
  validateResetPasswordForm,
  validateEmployeeForm
};
