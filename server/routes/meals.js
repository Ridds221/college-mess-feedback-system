const express = require("express");
const router = express.Router();
const {
    createMeal,
    getMeals,
    getMealById,
    updateMeal,
    deleteMeal,
}   = require("../controllers/mealController");
const {ProcessingInstruction, adminOnly }= require("../middleware/auth");

router.get("/",getMeals);
router.get("/:id",getMealById);

router.post("/",Protect, adminOnly, creatMeal);
router.put("/:id", Protect, adminOnly, updateMeal);
router.delete("/:id", protect, adminOnly, deleteMeal);

module.exports = router;