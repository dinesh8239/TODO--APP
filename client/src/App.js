import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // import the styles

const API_URL = 'http://localhost:3200/api/todos';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      console.log('Response from API:', response.data); // log to check
      if (Array.isArray(response.data.data)) {
        setTodos(response.data.data); // changed this line
      } else {
        console.error('Unexpected response:', response.data);
        setTodos([]);
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
      toast.error('Failed to load todos!');
    }
    setLoading(false);
  };

  const addTodo = async () => {
    if (!text.trim()) {
      toast.warn('Please enter a todo!');
      return;
    }
    try {
      await axios.post(API_URL, { text });
      toast.success('Todo added successfully!');
      setText('');
      fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
      toast.error('Failed to add todo!');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.success('Todo deleted!');
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
      toast.error('Failed to delete todo!');
    }
  };

  const toggleComplete = async (id) => {
    try {
      await axios.patch(`${API_URL}/${id}`);
      toast.success('Todo updated!');
      fetchTodos();
    } catch (error) {
      console.error('Error toggling todo:', error);
      toast.error('Failed to update todo!');
    }
  };

  return (
    <div style={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} /> {/* Toast container */}

      <h1 style={styles.title}>Todo App</h1>

      <div style={styles.inputContainer}>
        <input
          type="text"
          value={text}
          placeholder="Enter todo..."
          onChange={(e) => setText(e.target.value)}
          style={styles.input}
        />
        <button onClick={addTodo} style={styles.addButton}>Add</button>
      </div>

      {loading ? (
        <p style={{ marginTop: 20 }}>Loading todos...</p>
      ) : (
        <ul style={styles.list}>
          {Array.isArray(todos) && todos.length > 0 ? (
            todos.map((todo) => (
              <li key={todo._id} style={styles.todoItem}>
                <span
                  style={{
                    ...styles.todoText,
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? '#aaa' : '#333',
                  }}
                  onClick={() => toggleComplete(todo._id)}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo._id)}
                  style={styles.deleteButton}
                >
                  
                </button>
              </li>
            ))
          ) : (
            <p style={{ marginTop: 20 }}>Todos not found.</p>
          )}
        </ul>
      )}
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '40px auto',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '2rem',
    color: '#333',
  },
  inputContainer: {
    display: 'flex',
    marginBottom: '20px',
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginRight: '10px',
  },
  addButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  todoItem: {
    backgroundColor: '#fff',
    marginBottom: '10px',
    padding: '12px 20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'all 0.3s',
  },
  todoText: {
    fontSize: '18px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '20px',
  },
};

export default App;
