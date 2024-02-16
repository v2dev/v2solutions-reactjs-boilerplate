import React from 'react';
import { RegisterOptions, SubmitHandler, useForm } from "react-hook-form";
import { TextField } from '@mui/material';

export const Email = 'email';
export const Password = 'password';

export interface IFormFields {
    email: string;
    password: string;
};

export const ReactHookFormExample: React.FC = () => {

    const { register, handleSubmit, setError, reset, formState: { errors, isSubmitting }, } = useForm();

    const testEmail = (minLength: number | null, field: string) => register(field, {
        required: `${field} is required`,
        // minLength: {
        //     value: minLength == null ? null : minLength,
        //     message: `${field} must have at least ${minLength} characters`
        // },
        // validate: (value) => {
        //     if (!value.includes("@")) {
        //         return `${field} must include @`
        //     }
        //     return true;
        // }
    })

    const onSubmit: SubmitHandler<IFormFields> = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log(data);
        } catch (error) {
            setError("root", {
                message: "Error from API",
            });
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>

                <TextField {...testEmail(null, Email)} type="text" placeholder="Email" style={{ width: 'auto' }} />
                {errors.email && (<div style={{ color: 'red' }}>{errors.email.message}</div>)}

                <TextField {...testEmail(5, Password)} type="password" placeholder="Password" style={{ width: 'auto' }} />
                {errors.password && (<div style={{ color: 'red' }}>{errors.password.message}</div>)}

                <button
                    disabled={isSubmitting}
                    style={{ backgroundColor: 'green', width: '100px' }}
                    type="submit">
                    {isSubmitting ? "Loading..." : "Submit"}
                </button>

                <input
                    style={{ display: "block", marginTop: 20 }}
                    type="reset"
                    value="Standard Reset Field Values"
                />
                {errors.root && <div style={{ color: 'red' }}>{errors.root.message}</div>}
            </form >
        </>
    );
};
