import React, { useState, useEffect } from 'react';
import useCrudApi from '../../hooks/useCrudApi';
import API_ENDPOINTS from '../../configs/apiConfig';
import { connect } from 'react-redux';
import { setTodos, addTodo, updateTodo, deleteTodo } from '../../redux/todos';

function TodoApp(props) {
  const apiEndpoint = API_ENDPOINTS.TODOS;
  const { addTodo, updateTodo, deleteTodo } = props;
  const { todos,fetchData,postData, updateData, deleteData, isLoading, error } = useCrudApi(apiEndpoint);

  const [newTodo, setNewTodo] = useState({ title: '', description: '', completed: false });
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchData();
  }, []); 
  

  const handleAddTodo = async () => {
    try {
      const response = await postData(newTodo);
      if (!response.error) {
        addTodo(response.todo);
        setNewTodo({ title: '', description: '', completed: false });
        fetchData();
      } else {
        console.error('API Error:', response.error);
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleEditTodo = async () => {
    if (editingTask !== null) {
      try {
        const response = await updateData(editingTask, newTodo);
        if (!response.error) {
          updateTodo(newTodo);
          setNewTodo({ title: '', description: '', completed: false });
          setEditingTask(null);
          fetchData(); // Refresh the data after updating
        } else {
          console.error('API Error:', response.error);
        }
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };

  const handleDeleteTodo = async (taskId) => {
    try {
      const response = await deleteData(taskId);
      if (!response.error) {
        deleteTodo(taskId);
      } else {
        console.error('API Error:', response.error);
      }
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
        <ul>
          {todos.map((todo) => (
            <li key={todo._id}>
              <strong>{todo.title}</strong>
              <p>{todo.description}</p>
              <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
              <button className="edit-button" onClick={() => setEditingTask(todo._id)}>
                Edit
              </button>
              <button className="delete-button" onClick={() => handleDeleteTodo(todo._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  todos: state.todos.todos,
});

export default connect(mapStateToProps, { setTodos, addTodo, updateTodo, deleteTodo })(TodoApp);
