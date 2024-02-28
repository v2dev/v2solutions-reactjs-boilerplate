// EmployeeAddEditModal.tsx
import React from "react"
import { Box, Button, Modal, Stack, TextField } from "@mui/material"
import { SubmitHandler, useForm } from "react-hook-form"
import useCrudApi from "../../hooks/useCrudApi"
import API_ENDPOINTS from "../../configs/apiConfig"
import { EmployeeActionType, IFormFieldsProps } from "../../Models/employeeModel"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import {
  setEmployeeDesignation,
  setEmployeeDob,
  setEmployeeEducation,
  setEmployeeEmail,
  setEmployeeName,
} from "../../redux/newEmployeeActions"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { validateEmployeeForm } from "../../helpers/formValidation"

const EmployeeAddEditModal: React.FC<IFormFieldsProps> = (
  props: IFormFieldsProps,
) => {
  const { postData, updateData } = useCrudApi(API_ENDPOINTS.EMPLOYEES)
  const dispatch = useDispatch()
  const {
    employeeName,
    employeeEmail,
    employeeDob,
    employeeDesignation,
    employeeEducation,
  } = useSelector((state: RootState) => state.newEmployee) || {}

  const {
    register,
    handleSubmit,
    setError,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name:
        props.actionType === EmployeeActionType.Add
          ? ""
          : props.employees !== undefined || props.employees !== null
          ? props.employees.name
          : "",
      email:
        props.actionType === EmployeeActionType.Add
          ? ""
          : props.employees !== undefined || props.employees !== null
          ? props.employees.email
          : "",
      dob:
        props.actionType === EmployeeActionType.Add
          ? ""
          : props.employees !== undefined || props.employees !== null
          ? props.employees.dob
          : "",
      designation:
        props.actionType === EmployeeActionType.Add
          ? ""
          : props.employees !== undefined || props.employees !== null
          ? props.employees.designation
          : "",
      education:
        props.actionType === EmployeeActionType.Add
          ? ""
          : props.employees !== undefined || props.employees !== null
          ? props.employees.education
          : "",
    },
  })

  const onSubmit: SubmitHandler<IFormFieldsProps> = async (data: any) => {
    const formErrors = validateEmployeeForm(data)

    if (Object.keys(formErrors).length === 0) {
      switch (props.actionType) {
        case EmployeeActionType.Add:
          await AddEditEmployee(EmployeeActionType.Add, data)
          break
        case EmployeeActionType.Edit:
          await AddEditEmployee(EmployeeActionType.Edit, data)
          break
      }
    } else {
      // Display the error messages
      setError("root", {
        message: "Form validation failed",
      })
      setError("name", {
        message: formErrors.name || "",
      })
      setError("email", {
        message: formErrors.email || "",
      })
      setError("dob", {
        message: formErrors.dob || "",
      })
      setError("designation", {
        message: formErrors.designation || "",
      })
      setError("education", {
        message: formErrors.education || "",
      })
    }
  }

  const AddEditEmployee = async (actionType: EmployeeActionType, data: any) => {
    try {
      const response =
        actionType === EmployeeActionType.Add
          ? await postData(data)
          : await updateData(props.employees._id, data)

      if (response.status === 200) {
        props.closeModal(false)
        reset()
      } else
        setError("root", {
          message: `Error from API. ${response.response.data.message}`,
        })
    } catch (error) {
      setError("root", {
        message: `Error. ${error}`,
      })
    }
  }

  const handleModalClose = () => {
    reset()
    props.closeModal(false)
  }

  return (
    <div>
      <Modal
        open={props.isOpen}
        onClose={() => handleModalClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="employee-box">
          <h2 id="modal-modal-title">
            {props.actionType === EmployeeActionType.Add
              ? "Add Employee"
              : "Update Employee"}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={1} width={300}>
              <TextField
                label="Name"
                {...register("name", {
                  onChange: (e) => dispatch(setEmployeeName(e.target.value)),
                  value: employeeName,
                })}
              />
              {errors.name && (
                <div style={{ color: "red" }}>{errors.name.message}</div>
              )}
              <TextField
                label="Email"
                {...register("email", {
                  onChange: (e) => dispatch(setEmployeeEmail(e.target.value)),
                  value: employeeEmail,
                })}
              />
              {errors.email && (
                <div style={{ color: "red" }}>{errors.email.message}</div>
              )}

              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Select MI Date" />
              </LocalizationProvider> */}

              <TextField
                label="Date of Birth"
                {...register("dob", {
                  onChange: (e) => dispatch(setEmployeeDob(e.target.value)),
                  value: employeeDob,
                })}
              />
              {errors.dob && (
                <div style={{ color: "red" }}>{errors.dob.message}</div>
              )}

              <TextField
                label="Designation"
                {...register("designation", {
                  onChange: (e) => dispatch(setEmployeeDesignation(e.target.value)),
                  value: employeeDesignation,
                })}
              />
              {errors.designation && (
                <div style={{ color: "red" }}>{errors.designation.message}</div>
              )}

              <TextField
                label="Education"
                {...register("education", {
                  required: `Education is required`,
                  onChange: (e) => dispatch(setEmployeeEducation(e.target.value)),
                  value: employeeEducation,
                })}
              />
              {errors.education && (
                <div style={{ color: "red" }}>{errors.education.message}</div>
              )}

              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    disabled={isSubmitting}
                    size="medium"
                    variant="contained"
                    sx={{ width: "48%" }}
                    type="submit"
                  >
                    {isSubmitting
                      ? "Saving..."
                      : props.actionType === EmployeeActionType.Add
                      ? "Save"
                      : "Update"}
                  </Button>
                  <Button
                    size="medium"
                    variant="contained"
                    onClick={() => handleModalClose()}
                    sx={{ width: "48%" }}
                  >
                    Close
                  </Button>
                </div>
              </div>

              {errors.root && (
                <div style={{ color: "red" }}>{errors.root.message}</div>
              )}
            </Stack>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

export default EmployeeAddEditModal
