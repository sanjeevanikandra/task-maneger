const mongoose = require('mongoose');
// Create a schema
const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Create a model
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;