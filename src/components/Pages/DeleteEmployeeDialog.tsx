import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import useCrudApi from '../../hooks/useCrudApi';
import API_ENDPOINTS from '../../configs/apiConfig';

export interface IDeleteEmployeeProps {
  id: string;
  isOpen: boolean;
  closeModal: (closeModal: boolean) => void;
}

const DeleteEmployee: React.FC<IDeleteEmployeeProps> = ({ id, isOpen, closeModal }: IDeleteEmployeeProps) => {
  const { deleteData } = useCrudApi(API_ENDPOINTS.EMPLOYEES);

  const handleDelete = async () => {
    try {
      const response = await deleteData(id);
      if (response && !response.error) {
        closeModal(false);
      } else if (response && response.error) {
        console.error('API Error:', response.error);
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={() => closeModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Employee?"}</DialogTitle>
        <DialogContent>{"Are you sure you want to delete this employee?"}</DialogContent>
        <DialogActions>
          <Button onClick={() => closeModal(false)}>Cancel</Button>
          <Button autoFocus onClick={handleDelete}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteEmployee;