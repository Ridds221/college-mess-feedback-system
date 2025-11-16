const express = require('express');
const Feedback = require('../config/models/Feedback');
const User = require('../config/models/User');
const auth = require('../routes/middlewears/auth');
const requireRole = require('../routes/middlewears/role');

const router = express.Router();

// Only admins and managers can see all feedback/users
router.get('/dashboard', auth, requireRole('admin', 'manager'), async (req, res) => {
  const feedbacks = await Feedback.find();
  const users = await User.find();
  res.json({ feedbacks, users });
});

module.exports = router;
