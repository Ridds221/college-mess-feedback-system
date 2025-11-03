const Meal = require("../models/Meal");

exports.createMeal = async(req, res) => {
    try{
        const { date, mealType, items, nutrition } = req.body;

        const meal = new Meal({
            date,
            mealType,
            items,
            nutrition,
            createdBy: req.user.userId,
        });

        await meal.save();
        res.status(201).json(meal);
    }  catch (err)  {
        res.status(500).json({ messafe: "Server error", error: err.message});
    }
};

exports.getMeals= async(req,res) => {
    try {
        const { date,mealType } = req.query;
        let filter = {};
        
        if (date) {
            filter.date = new Date(date);
        }
        if (mealType) {
            filter.mealType = mealType;
        }

        const meals = await Meal.find(filter).populate("createdBy","name email").sort({date:-1});
        res.json(meals);
    }   catch (err) {
        res.status(500).json({ message: "Server error"});
    }
};

exports.getMealById = async(req,res) => {
    try {
        const meal= await Meal.findById(req.params.id).populate("createdBy", "name email");

        if (!meal) {
            return res.status(404).json({message: "Meal not found"});
        }

        res.json(meal);
    }   catch (err) {
        res.status(500).json({Message: "Server error"});
    }
};

exports.updateMeal = async (req, res) => {
  try {
    const meal = await Meal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }

    res.json(meal);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.deleteMeal = async (req, res) => {
  try {
    const meal = await Meal.findByIdAndDelete(req.params.id);

    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }

    res.json({ message: "Meal deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
