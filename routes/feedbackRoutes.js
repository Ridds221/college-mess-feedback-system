// routes/feedbackRoutes.js

const express = require('express');
const router = express.Router();
const Feedback = require('../config/models/Feedback');

// POST /api/feedback - add new feedback (with validation)
router.post('/', async (req, res) => {
  try {
    const { messId, userId, rating, comments } = req.body;

    // Validation logic
    if (!messId || typeof messId !== "string" || !messId.trim()) {
      return res.status(400).json({ message: "Mess ID is required" });
    }
    if (
      rating === undefined ||
      typeof rating !== "number" ||
      isNaN(rating) ||
      rating < 1 ||
      rating > 5
    ) {
      return res.status(400).json({ message: "Rating must be a number between 1 and 5" });
    }

    const feedback = new Feedback({ messId, userId, rating, comments });
    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


// Existing GET route (for reference)
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

// GET /api/feedback?messId=...&rating=...
router.get('/', async (req, res) => {
  try {
    const { messId, rating } = req.query;
    const filter = {};
    if (messId) filter.messId = messId;
    if (rating) filter.rating = Number(rating);

    const feedbacks = await Feedback.find(filter);
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Edit feedback
router.put('/:id', auth, async (req, res) => {
  const feedback = await Feedback.findById(req.params.id);
  if (!feedback) return res.status(404).json({ message: "Not found" });
  if (
    feedback.username !== req.user.username &&
    !['admin', 'manager'].includes(req.user.role)
  ) return res.status(403).json({ message: "Forbidden" });
  feedback.message = req.body.message;
  await feedback.save();
  res.json(feedback);
});

// Delete feedback
router.delete('/:id', auth, async (req, res) => {
  const feedback = await Feedback.findById(req.params.id);
  if (!feedback) return res.status(404).json({ message: "Not found" });
  if (
    feedback.username !== req.user.username &&
    !['admin', 'manager'].includes(req.user.role)
  ) return res.status(403).json({ message: "Forbidden" });
  await Feedback.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});
