import React, { useEffect, useState } from 'react';
import TodoItem from '../components/TodoItem';
import TodoForm from '../components/TodoForm';
import { getTodos, createTodo, deleteTodo, toggleTodo } from '../services/todoService';

const Home = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const res = await getTodos();
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAdd = async (text) => {
    const res = await createTodo(text);
    setTodos([...todos, res.data]);
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  const handleToggle = async (id) => {
    const res = await toggleTodo(id);
    setTodos(todos.map(todo => todo._id === id ? res.data : todo));
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <TodoForm onAdd={handleAdd} />
      <ul>
        {todos.map(todo => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default Home;
