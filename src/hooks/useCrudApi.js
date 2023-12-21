import { useState } from "react"
import axios from "axios"
import API_BASE_URL from "../configs/apiBaseUrl" // Import the base URL


const useCrudApi = (apiEndpoint) => {
  // const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async (param) => {
    setIsLoading(true)
    setError(null)

    try {

      const response = await axios.get(API_BASE_URL + apiEndpoint+ param)
      setIsLoading(false); // Move this line inside the try block

      return response.data
    } catch (error) {
      setError(error)
      setIsLoading(false); // Move this line inside the try block

    }

    setIsLoading(false)
  }

  const postData = async (newData) => {
    try {
      const response = await axios.post(API_BASE_URL + apiEndpoint, newData)
      return response
    } catch (error) {
      return error
    }
  }

  const getData = async (param) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.get(API_BASE_URL + apiEndpoint+param)
      setIsLoading(false); // Move this line inside the try block

      return response.data
    } catch (error) {
      setIsLoading(false);

      setError(error)
    }
  }

  const updateData = async (itemId, updatedData) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}${apiEndpoint}`+'/'+`${itemId}`,
        updatedData,
      )
      return response

    } catch (error) {
      return error
    }
  }

  const deleteData = async (itemId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}${apiEndpoint}`+'/'+`${itemId}`)
      return response
    } catch (error) {
      return error
    }
  }
  return { isLoading, error, fetchData, postData, updateData, deleteData,getData }
}

export default useCrudApi
