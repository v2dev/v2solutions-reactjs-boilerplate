import React, { useState, useEffect } from 'react';
import useCrudApi from '../../hooks/useCrudApi'; // Import the new CRUD hook
import API_ENDPOINTS from '../../configs/apiConfig';

function TodoApp() {
  const apiEndpoint = API_ENDPOINTS.TODOS; 

  const {
    data: todos,
    isLoading,
    error,
    fetchData,
    postData,
    updateData,
    deleteData,
  } = useCrudApi(apiEndpoint);

  const [newTodo, setNewTodo] = useState({ title: '', description: '', completed: false });
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchData();
  }, []); // Fetch data when the component mounts
  useEffect(() => {
    // If editingTask is set, populate the form with the task data
    if (editingTask !== null) {
      const taskToEdit = todos.find((task) => task._id === editingTask);
      if (taskToEdit) {
        setNewTodo({ ...taskToEdit });
      }
    }
  }, [editingTask, todos]);

  const handleAddTodo = async () => {
    try {
      const response = await postData(newTodo);
      setNewTodo({ title: '', description: '', completed: false });
      fetchData(); // Refresh the data after adding
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleEditTodo = async () => {
    if (editingTask !== null) {
      try {
        await updateData(editingTask, newTodo);
        setNewTodo({ title: '', description: '', completed: false });
        setEditingTask(null);
        fetchData(); // Refresh the data after updating


        
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };

  const handleDeleteTodo = async (taskId) => {
    try {
      await deleteData(taskId);
      fetchData(); // Refresh the data after deleting
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <div>
        <h2>{editingTask !== null ? 'Edit Task' : 'Add New Task'}</h2>
        <input
          type="text"
          placeholder="Title"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTodo.description}
          onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
        />
        <label>
          Completed:
          <input
            type="checkbox"
            checked={newTodo.completed}
            onChange={(e) => setNewTodo({ ...newTodo, completed: e.target.checked })}
          />
        </label>
        {editingTask !== null ? (
          <button onClick={handleEditTodo} disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Update Task'}
          </button>
        ) : (
          <button onClick={handleAddTodo} disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add Task'}
          </button>
        )}
        {error && <div>Error: {error.message}</div>}
      </div>
      <div>
        <h2>Todo List</h2>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          <ul>
            {todos.map((todo) => (
              <li key={todo._id}>
                <strong>{todo.title}</strong>
                <p>{todo.description}</p>
                <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
                <button className="edit-button" onClick={() => setEditingTask(todo._id)}>Edit</button>
                <button className="delete-button" onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TodoApp;
