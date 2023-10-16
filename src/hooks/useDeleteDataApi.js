import { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../configs/apiBaseUrl'; // Import the base URL

function useDeleteDataApi(endpoint) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const deleteData = async (id) => {
    try {
      setIsDeleting(true);
      setDeleteError(null);

      // Send a DELETE request to the specified endpoint with the given ID
      const response = await axios.delete(`${API_BASE_URL}${endpoint}/${id}`);
      
      // Optionally, you can return the deleted item or a success message if needed
      return response.data;
    } catch (error) {
      setDeleteError(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return { isDeleting, deleteError, deleteData };
}

export default useDeleteDataApi;
