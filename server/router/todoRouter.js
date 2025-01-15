const Todo = require('../models/todo');
const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');

// Getting AI-based task priority
const run = require('../geminiApi');


// Create a todo
router.post('/', async (req, res) => {
    const { title,priority,date } = req.body;
    try {
        const todoData = await Todo.create({
            title: title,
            
            date: date
        });

        res.status(201).json(todoData); 
    } catch (err) {
        res.status(400).json({ message: err.message });
    }   
    
})

// Get all todos
router.get('/', async (req, res) => {
    try {
        const showTodo = await Todo.find();
        res.status(200).json(showTodo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a todo by id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleteTodo = await Todo.findByIdAndDelete(id);
        res.status(200).json(deleteTodo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a todo by id
app.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
  
    try {
      const task = await Task.findByIdAndUpdate(id, { completed }, { new: true });
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json(task);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err });
    }
  });
  

module.exports = router;
