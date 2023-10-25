import { useState, useEffect } from "react"
import axios from "axios"
import API_BASE_URL from "../configs/apiBaseUrl" // Import the base URL

const useCrudApi = (apiEndpoint) => {
  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.get(API_BASE_URL + apiEndpoint)
      setTodos(response.data)
    } catch (error) {
      setError(error)
    }

    setIsLoading(false)
  }

  const postData = async (newData) => {
    try {
      const response = await axios.post(API_BASE_URL + apiEndpoint, newData)
      return response.data
    } catch (error) {
      return error
    }
  }

  const updateData = async (itemId, updatedData) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}${apiEndpoint}/${itemId}`,
        updatedData,
      )
      return response.data
    } catch (error) {
      return error
    }
  }

  const deleteData = async (itemId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}${apiEndpoint}/${itemId}`)
      return response.data
    } catch (error) {
      return error
    }
  }

  useEffect(() => {
    fetchData()
  }, []) // Fetch data when the component mounts

  return { todos, isLoading, error, fetchData, postData, updateData, deleteData }
}

export default useCrudApi
