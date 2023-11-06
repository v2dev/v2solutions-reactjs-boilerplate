import { useState, useEffect } from "react"
import axios from "axios"
import API_BASE_URL from "../configs/apiBaseUrl" // Import the base URL
import { useDispatch } from "react-redux";

import {
  setTodos as setTodosAction,
  addTodo as addTodoAction,
  updateTodo as updateTodoAction,
  deleteTodo as deleteTodoAction
} from "../redux/todos"; // Import your actions

const useCrudApi = (apiEndpoint) => {
  const dispatch = useDispatch();

  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.get(API_BASE_URL + apiEndpoint)
      setTodos(response.data)
      dispatch(setTodosAction(response.data)); // Dispatch action to set todos in Redux store

    } catch (error) {
      setError(error)
    }

    setIsLoading(false)
  }

  const postData = async (newData) => {
    try {
      const response = await axios.post(API_BASE_URL + apiEndpoint, newData)
      dispatch(addTodoAction(response.data)); 
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
      dispatch(updateTodoAction(updatedData)); 
      return response.data

    } catch (error) {
      return error
    }
  }

  const deleteData = async (itemId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}${apiEndpoint}/${itemId}`)
      dispatch(deleteTodoAction(itemId)); 
      return response.data
    } catch (error) {
      return error
    }
  }

  useEffect(() => {
    fetchData();
  }, [apiEndpoint]); // Fetch data when the component mounts or apiEndpoint changes

  return { todos, isLoading, error, fetchData, postData, updateData, deleteData }
}

export default useCrudApi
