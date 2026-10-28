const express = require('express');
const router = express.Router();
const {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
} = require('../controllers/todoController');

// Routes for /todos
router.route('/')
  .post(createTodo)   // POST /todos - Create a new Task
  .get(getAllTodos);  // GET /todos - Get all Tasks

// Routes for /todos/:id
router.route('/:id')
  .get(getTodoById)   // GET /todos/:id - Get a specific Task
  .put(updateTodo)    // PUT /todos/:id - Update a specific Task
  .delete(deleteTodo); // DELETE /todos/:id - Delete a specific Task

module.exports = router;
