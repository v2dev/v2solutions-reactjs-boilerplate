import React from "react";
import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import Save from '@mui/icons-material/Save';
import Edit from '@mui/icons-material/Edit';
import { SubmitHandler, useForm } from "react-hook-form";
import useCrudApi from "../../hooks/useCrudApi";
import API_ENDPOINTS from "../../configs/apiConfig";
import { EmployeeActionType, IFormFieldsProps } from "../../Models/employeeModel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setEmployeeDesignation, setEmployeeDob, setEmployeeEducation, setEmployeeEmail, setEmployeeName } from "../../redux/newEmployeeActions";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const EmployeeAddEditModal: React.FC<IFormFieldsProps> = (props: IFormFieldsProps) => {

    const { postData, updateData } = useCrudApi(API_ENDPOINTS.EMPLOYEES);
    const dispatch = useDispatch();
    const { employeeName, employeeEmail, employeeDob, employeeDesignation, employeeEducation } = useSelector((state: RootState) => state.newEmployee) || {};

    const { register, handleSubmit, setError, reset, control, formState: { errors, isSubmitting }, } = useForm({
        defaultValues: {
            name: props.actionType === EmployeeActionType.Add ? '' : ((props.employees !== undefined || props.employees !== null) ? props.employees.name : ''),
            email: props.actionType === EmployeeActionType.Add ? '' : ((props.employees !== undefined || props.employees !== null) ? props.employees.email : ''),
            dob: props.actionType === EmployeeActionType.Add ? '' : ((props.employees !== undefined || props.employees !== null) ? props.employees.dob : ''),
            designation: props.actionType === EmployeeActionType.Add ? '' : ((props.employees !== undefined || props.employees !== null) ? props.employees.designation : ''),
            education: props.actionType === EmployeeActionType.Add ? '' : ((props.employees !== undefined || props.employees !== null) ? props.employees.education : ''),
        }
    });

    const onSubmit: SubmitHandler<IFormFieldsProps> = async (data: any) => {
        switch (props.actionType) {
            case EmployeeActionType.Add: await AddEditEmployee(EmployeeActionType.Add, data)
                break;
            case EmployeeActionType.Edit: await AddEditEmployee(EmployeeActionType.Edit, data)
                break;
        }
    };


    const AddEditEmployee = async (actionType: EmployeeActionType, data: any) => {
        try {
            const response = actionType === EmployeeActionType.Add ? await postData(data) : await updateData(props.employees._id, data);

            if (response.status === 200) {
                props.closeModal(false);
                reset();
            }
            else setError("root", { message: `Error from API. ${response.response.data.message}`, });

        } catch (error) {
            setError("root", {
                message: `Error. ${error}`,
            });
        }
    }

    const handleModalClose = () => {
        reset();
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

                <Box sx={style}>
                    <h2 id="modal-modal-title">{props.actionType === EmployeeActionType.Add ? 'Add' : 'Edit'}</h2>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Stack spacing={1} width={300}>
                            <TextField
                             label="Name"
                                id="filled-read-only-input"
                                {...register('name',
                                    {
                                        required: `Name is required`,
                                        onChange: (e) => dispatch(setEmployeeName(e.target.value)),
                                        value: employeeName
                                    })}
                            />
                            {errors.name && (<div style={{ color: 'red' }}>{errors.name.message}</div>)}
                            <TextField
                             label="Email"
                                {...register('email',
                                    {
                                        required: `Email is required`,
                                        validate: (value) => {
                                            const emailRegex = /^((?:[^<>()\[\]\\.,;:\s@"]+(?:\.[^<>()\[\]\\.,;:\s@"]+)*)|(?:".+"))@(?:(?:\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|((?:[a-zA-Z\-0-9]+\.)+([a-zA-Z]{2,})))$/;
                                            if (!emailRegex.test(value)) {
                                                return 'Invalid email format';
                                            }
                                            return true;
                                        },
                                        onChange: (e) => dispatch(setEmployeeEmail(e.target.value)),
                                        value: employeeEmail
                                    })}
                            />
                            {errors.email && (<div style={{ color: 'red' }}>{errors.email.message}</div>)}
                            {/* TODO: Need to create a Date Picker here. Currently the documentation is incomplete hence its in TODO */}
                            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    defaultValue={dayjs(new Date())}                                    
                                    value={dob}
                                    onChange={(newValue) => { setDob(newValue) }}
                                />
                            </LocalizationProvider> */}
                            {/* <ErrorMessage
                                errors={errors}
                                name="DateOfBirth"
                                render={({ message }) => <p>{message}</p>}
                            /> */}
                            <TextField
                              label="Date of Birth"
                                {...register('dob',
                                    {
                                        required: `Date Of Birth is required`,
                                        onChange: (e) => dispatch(setEmployeeDob(e.target.value)),
                                        value: employeeDob
                                    })}
                            />
                            {errors.dob && (<div style={{ color: 'red' }}>{errors.dob.message}</div>)}

                            <TextField
                              label="Designation"
                                {...register('designation',
                                    {
                                        required: `Designation is required`,
                                        onChange: (e) => dispatch(setEmployeeDesignation(e.target.value)),
                                        value: employeeDesignation
                                    })}
                            />
                            {errors.designation && (<div style={{ color: 'red' }}>{errors.designation.message}</div>)}

                            <TextField
                              label="Education"
                                {...register('education',
                                    {
                                        required: `Education is required`,
                                        onChange: (e) => dispatch(setEmployeeEducation(e.target.value)),
                                        value: employeeEducation
                                    })}
                            />
                            {errors.education && (<div style={{ color: 'red' }}>{errors.education.message}</div>)}
                            <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                                <Button
                                    disabled={isSubmitting}
                                    size="medium"
                                    variant="contained"
                                    endIcon={props.actionType === EmployeeActionType.Add ? <Save /> : <Edit />}
                                    sx={{ width: '100px' }}
                                    type="submit">
                                    {isSubmitting ? "Saving..." : "Save"}
                                </Button>
                            </div>

                            {errors.root && <div style={{ color: 'red' }}>{errors.root.message}</div>}
                        </Stack>
                    </form >
                </Box>
            </Modal>
        </div>
    )
}

export default EmployeeAddEditModal;

