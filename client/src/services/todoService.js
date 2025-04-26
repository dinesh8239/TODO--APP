import axios from 'axios';

const API_URL = 'http://localhost:3200/api/todos';

export const getTodos = () => axios.get(API_URL);
export const createTodo = (text) => axios.post(API_URL, { text });
export const deleteTodo = (id) => axios.delete(`${API_URL}/${id}`);
export const toggleTodo = (id) => axios.patch(`${API_URL}/${id}`);
