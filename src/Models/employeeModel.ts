export enum EmployeeActionType {
    Add,
    Edit,
}

export interface IEmployeeFormFields {
    _id: string;
    name: string;
    email: string;
    dob: string;
    designation: string;
    education: string;
};

export type IFormFields = {
    _id: string;
    name: string;
    email: string;
    dob: string;
    designation: string;
    education: string;
};

export interface IFormFieldsProps {
    isOpen: boolean;
    actionType: EmployeeActionType;
    employees: IFormFields;
    closeModal: (closeModal: boolean) => void;
}