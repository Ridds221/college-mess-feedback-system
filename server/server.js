const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Basic route
app.get("/", (req, res) => {
  res.send("College Mess Feedback System API running!");
});

// Auth routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/meals", require("./routes/meals"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});