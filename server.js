require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todoRoutes');

const app = express();

// Connect to MongoDB Database
connectDB();

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root Route - Welcome & API Documentation Summary
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Simple To-Do App Backend API',
    endpoints: {
      'POST /todos': 'Create a new task (body: { title, description?, completed? })',
      'GET /todos': 'Get all tasks',
      'GET /todos/:id': 'Get a specific task by ID',
      'PUT /todos/:id': 'Update a specific task by ID',
      'DELETE /todos/:id': 'Delete a specific task by ID',
    },
  });
});

// To-Do API Routes
app.use('/todos', todoRoutes);

// 404 Route Handler for undefined endpoints
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack || err.message);

  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📡 Base URL: http://localhost:${PORT}`);
  console.log(`📝 To-Do API: http://localhost:${PORT}/todos`);
});
