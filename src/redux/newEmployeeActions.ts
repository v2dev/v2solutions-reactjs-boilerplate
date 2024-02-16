import ActionTypeEmployee from "./actionTypes";

export const setEmployeeName = (payload: string) => ({ type: ActionTypeEmployee.SET_EMPLOYEE_NAME, payload });
export const setEmployeeEmail = (payload: string) => ({ type: ActionTypeEmployee.SET_EMPLOYEE_EMAIL, payload });
export const setEmployeeDob = (payload: string) => ({ type: ActionTypeEmployee.SET_EMPLOYEE_DOB, payload });
export const setEmployeeDesignation = (payload: string) => ({ type: ActionTypeEmployee.SET_EMPLOYEE_DESIGNATION, payload });
export const setEmployeeEducation = (payload: string) => ({ type: ActionTypeEmployee.SET_EMPLOYEE_EDUCATION, payload });

export const setCurrentPage = (payload: number) => ({ type: ActionTypeEmployee.SET_CURRENT_PAGE, payload });
export const setPageSize = (payload: number) => ({ type: ActionTypeEmployee.SET_PAGE_SIZE, payload });
export const setRowCount = (payload: number) => ({ type: ActionTypeEmployee.SET_ROW_COUNT, payload });
export const setLoading = (loading: boolean) => ({ type: ActionTypeEmployee.SET_LOADING, loading });