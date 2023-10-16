import { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../configs/apiBaseUrl'; // Import the base URL

function usePostDataApi(endpoint) {
  const [isPosting, setIsPosting] = useState(false);
  const [postError, setPostError] = useState(null);

  const postData = async (data) => {
    try {
      setIsPosting(true);
      setPostError(null);

      const response = await axios.post(API_BASE_URL + endpoint, data);
      return response.data; // You can return the response data if needed
    } catch (err) {
      setPostError(err);
    } finally {
      setIsPosting(false);
    }
  };

  return { isPosting, postError, postData };
}

export default usePostDataApi;
