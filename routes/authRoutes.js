const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../config/models/User');
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

// Register
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password) return res.status(400).json({ message: "Username & password required." });
  const exists = await User.findOne({ username });
  if (exists) return res.status(409).json({ message: "User exists." });
  const hashed = await bcrypt.hash(password, 10);
  // Only allow role if 'admin' or 'manager' are registering (for dev, you can set anyone for now)
  const userRole = ['admin', 'manager'].includes(role) ? role : 'student';
  await User.create({ username, password: hashed, role: userRole });
  res.status(201).json({ message: "User registered" });
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ message: "Invalid credentials." });
  const token = jwt.sign({ userId: user._id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '2d' });
  res.json({ token, username: user.username, role: user.role });
});

module.exports = router;