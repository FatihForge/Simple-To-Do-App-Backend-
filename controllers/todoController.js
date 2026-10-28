const mongoose = require('mongoose');
const Todo = require('../models/Todo');

/**
 * @desc    Create a new Todo task
 * @route   POST /todos
 * @access  Public
 */
const createTodo = async (req, res, next) => {
  try {
    const { title, description, completed } = req.body;

    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Title is required and must be a non-empty string',
      });
    }

    const newTodo = await Todo.create({
      title: title.trim(),
      description: typeof description === 'string' ? description.trim() : '',
      completed: typeof completed === 'boolean' ? completed : false,
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: newTodo,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all Todo tasks
 * @route   GET /todos
 * @access  Public
 */
const getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single Todo task by ID
 * @route   GET /todos/:id
 * @access  Public
 */
const getTodoById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Task ID format',
      });
    }

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a Todo task by ID
 * @route   PUT /todos/:id
 * @access  Public
 */
const updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Task ID format',
      });
    }

    // Build update object only with provided fields
    const updateData = {};
    if (title !== undefined) {
      if (typeof title !== 'string' || !title.trim()) {
        return res.status(400).json({
          success: false,
          message: 'Title must be a non-empty string',
        });
      }
      updateData.title = title.trim();
    }

    if (description !== undefined) {
      updateData.description = typeof description === 'string' ? description.trim() : '';
    }

    if (completed !== undefined) {
      if (typeof completed !== 'boolean') {
        return res.status(400).json({
          success: false,
          message: 'Completed must be a boolean (true or false)',
        });
      }
      updateData.completed = completed;
    }

    const updatedTodo = await Todo.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedTodo) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: updatedTodo,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a Todo task by ID
 * @route   DELETE /todos/:id
 * @access  Public
 */
const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Task ID format',
      });
    }

    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: deletedTodo,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
};
