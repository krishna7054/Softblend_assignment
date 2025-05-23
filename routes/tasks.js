import express from 'express';
import Task from '../models/Task.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Create a task
router.post('/', auth, async (req, res) => {
  const { title, description, dueDate, status, assignedUserId } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  try {
    const task = new Task({ title, description, dueDate, status, assignedUserId });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get task details
router.get('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('assignedUserId', 'name email');
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// List all tasks with optional filters and pagination
router.get('/', auth, async (req, res) => {
  const { status, assignedUserId, page = 1, limit = 10 } = req.query;
  const query = {};
  if (status) query.status = status;
  if (assignedUserId) query.assignedUserId = assignedUserId;

  try {
    const tasks = await Task.find(query)
      .populate('assignedUserId', 'name email')
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Task.countDocuments(query);
    res.json({ tasks, total, page: Number(page), limit: Number(limit) });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a task
router.put('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('assignedUserId', 'name email');
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a task
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
