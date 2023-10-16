import { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../configs/apiBaseUrl'; // Import the base URL

function usePutDataApi(endpoint) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const updateData = async (id, data) => {
    try {
      setIsUpdating(true);
      setUpdateError(null);
      const response = await axios.put(`${API_BASE_URL}${endpoint}/${id}`, data);
      return response.data; // You can return the updated data if needed
    } catch (err) {
      setUpdateError(err);
    } finally {
      setIsUpdating(false);
    }
  };

  return { isUpdating, updateError, updateData };
}

export default usePutDataApi;
