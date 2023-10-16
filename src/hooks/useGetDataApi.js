import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../configs/apiBaseUrl'; // Import the base URL

function useGetDataApi(endpoint) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await axios.get(API_BASE_URL + endpoint);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [endpoint]);
  return { data, isLoading, error,setData  };
}

export default useGetDataApi;
