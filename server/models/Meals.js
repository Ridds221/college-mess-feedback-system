const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    mealType: {
      type: String,
      enum: ["breakfast", "lunch", "dinner"],
      required: true,
    },
    items: [
      {
        name: { type: String, required: true },
        description: String,
      },
    ],
    nutrition: {
      calories: Number,
      protein: Number,
      carbs: Number,
      fats: Number,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Meal", MealSchema);
