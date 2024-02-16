import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react'
import useCrudApi from '../../hooks/useCrudApi';
import API_ENDPOINTS from '../../configs/apiConfig';

export interface IDeleteEmployeeProps {
    id: string;
    isOpen: boolean;
    closeModal: (closeModal: boolean) => void;
}

const DeleteEmployee: React.FC<IDeleteEmployeeProps> = (props: IDeleteEmployeeProps) => {

    const { deleteData } = useCrudApi(API_ENDPOINTS.EMPLOYEES);

    const handleDelete = async () => {
        try {
            const response = await deleteData(props.id);
            if (response && !response.error) {
                props.closeModal(false);
            } else if (response && response.error) {
                console.log('API Error:', response.error);
            } else {
                console.log('Unexpected response:', response);
            }
        } catch (error) {
            console.log('Error deleting item:', error);
        }
    };

    return (
        <React.Fragment>
            <Dialog
                open={props.isOpen}
                onClose={() => props.closeModal(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    {"Delete Employee?"}
                </DialogTitle>
                <DialogContent>
                    {"Are you sure you want to delete this employee?"}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => props.closeModal(false)}>Cancel</Button>
                    <Button autoFocus onClick={handleDelete}>Ok</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default DeleteEmployee;