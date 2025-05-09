const express = require('express');
const router = express.Router();
const {
  getTodos,
  createTodo,
  deleteTodo,
  toggleTodo
} = require('../controllers/todoController');

router.get('/', getTodos);
router.post('/', createTodo);
router.delete('/:id', deleteTodo);
router.patch('/:id', toggleTodo);

module.exports = router;
