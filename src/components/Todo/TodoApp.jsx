import React, { useState } from "react"
import useCrudApi from "../../hooks/useCrudApi"
import API_ENDPOINTS from "../../configs/apiConfig"
import { connect } from "react-redux"
import {
  setTodos as setTodosAction,
  addTodo as addTodoAction,
  updateTodo as updateTodoAction,
  deleteTodo as deleteTodoAction
} from "../../redux/todos"; // Import your actions

function TodoApp(props) {
  const apiEndpoint = API_ENDPOINTS.TODOS
  // eslint-disable-next-line react/prop-types
  const { addTodo, updateTodo, deleteTodo } = props
  const { todos, fetchData, postData, updateData, deleteData, isLoading, error } =
    useCrudApi(apiEndpoint)
  const [errorState, setErrorState] = useState(null);

  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    completed: false,
  })
  const [editingTask, setEditingTask] = useState(null)
  

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.title || !newTodo.description) {
      setErrorState("Please fill in both title and description.");
      return;
    }
    
    try {
      const response = await postData(newTodo)
      if (response && !response.error) {
        addTodo(response.todo)
        setNewTodo({ title: "", description: "", completed: false })
        fetchData()
        setErrorState(null); // Reset error state if successful

      } else if (response && response.error) {
        // Handle errors if response is defined
        console.log("API Error:", response.error)
      } else {
        console.log("Unexpected response:", response)
      }
    } catch (error) {
      console.log("Error adding task:", error)
    }
  }

  const handleEditTodo = async () => {
    if (editingTask !== null) {
      try {
        const response = await updateData(editingTask, newTodo)
        if (!response.error) {
          updateTodo(newTodo)
          setNewTodo({ title: "", description: "", completed: false })
          setEditingTask(null)
          fetchData() // Refresh the data after updating
        } else {
          console.log("API Error:", response.error)
        }
      } catch (error) {
        console.log("Error updating task:", error)
      }
    }
  }

  const handleDeleteTodo = async (taskId) => {
    try {
      const response = await deleteData(taskId)
      if (!response.error) {
        deleteTodo(taskId)
        fetchData()
      } else {
        console.log("API Error:", response.error)
      }
    } catch (error) {
      console.log("Error deleting task:", error)
    }
  }

  const onClickEditTodo = (todo) => {
    setNewTodo({
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
    })
    setEditingTask(todo._id)
  }

  return (
    <div className="container mt-5">
      <div className="row mb-4">
        <div className="col-md-6 ">
          <form>
            
            <h2>{editingTask !== null ? "Edit Task" : "Add New Task"}</h2>
            {errorState && <div className="text-danger mt-3">{errorState}</div>}
            <div className="mb-3 row">
              
              <label className="col-sm-2 col-form-label">Title</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Title"
                  value={newTodo.title}
                  onChange={(e) =>
                    setNewTodo({ ...newTodo, title: e.target.value })
                  }
                />
                
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">Description</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  value={newTodo.description}
                  onChange={(e) =>
                    setNewTodo({ ...newTodo, description: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                checked={newTodo.completed}
                onChange={(e) =>
                  setNewTodo({ ...newTodo, completed: e.target.checked })
                }
              />
              <label className="form-check-label">Completed</label>
            </div>
            {editingTask !== null ? (
              <button
                className="btn btn-primary"
                onClick={handleEditTodo}
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Task"}
              </button>
            ) : (
              <button
                className="btn btn-success"
                onClick={handleAddTodo}
                disabled={isLoading}
              >
                {isLoading ? "Adding..." : "Add Task"}
              </button>
            )}
            {error && <div className="text-danger mt-3">Error: {error.message}</div>}
          </form>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          
          <ul className="list-group">
            {todos.map((todo) => (
              <li
                key={todo._id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <h5>{todo.title}</h5>
                  <p>{todo.description}</p>
                  <p>Completed: {todo.completed ? "Yes" : "No"}</p>
                </div>
                <div>
                  <button
                    className="btn btn-info me-2"
                    onClick={() => onClickEditTodo(todo)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteTodo(todo._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  todos: state.todos.todos,
})
const mapDispatchToProps = {
  setTodos: setTodosAction,
  addTodo: addTodoAction,
  updateTodo: updateTodoAction,
  deleteTodo: deleteTodoAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
