const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
    hostelBlock: {
      type: String,
    },
    roomNumber: {
      type: String,
    },
    dietaryPreferences: {
      vegetarian: { type: Boolean, default: false },
      vegan: { type: Boolean, default: false },
      allergies: [{ type: String }],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);