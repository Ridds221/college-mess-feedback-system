# Database Schema Design

## Overview
This document details the MongoDB database schema for the College Mess Feedback System. All models use Mongoose ODM for schema validation and relationship management.

---

## 1. User Model

**Collection Name:** `users`

**Purpose:** Store student and admin accounts with authentication credentials and preferences.

### Schema Structure
{
name: String (required),
email: String (required, unique, lowercase),
password: String (required, hashed),
role: String (enum: ["student", "admin"], default: "student"),
hostelBlock: String (optional),
roomNumber: String (optional),
dietaryPreferences: {
vegetarian: Boolean (default: false),
vegan: Boolean (default: false),
allergies: [String]
},
createdAt: Date (timestamp),
updatedAt: Date (timestamp)
}

text

### Sample Document
{
"_id": "507f1f77bcf86cd799439011",
"name": "Priya Sharma",
"email": "priya@college.edu",
"password": "$2a$10$hashedPasswordHere",
"role": "student",
"hostelBlock": "A Block",
"roomNumber": "A-204",
"dietaryPreferences": {
"vegetarian": true,
"vegan": false,
"allergies": ["peanuts"]
},
"createdAt": "2025-11-02T10:30:00.000Z",
"updatedAt": "2025-11-02T10:30:00.000Z"
}

text

### Validation Rules
- Email must be valid format and unique
- Password minimum 8 characters (hashed with bcrypt)
- Role must be either "student" or "admin"

### Indexes
- `email`: unique index for fast lookups and constraint

---

## 2. Meal Model

**Collection Name:** `meals`

**Purpose:** Store daily meal information with menu items and nutrition data.

### Schema Structure

{
date: Date (required, indexed),
mealType: String (enum: ["breakfast", "lunch", "dinner"], required),
items: [
{
name: String,
category: String,
description: String
}
],
nutrition: {
calories: Number,
protein: Number,
carbs: Number,
fat: Number
},
specialNotes: String,
createdBy: ObjectId (ref: "User"),
createdAt: Date,
updatedAt: Date
}

text

### Sample Document
{
"_id": "507f1f77bcf86cd799439012",
"date": "2025-11-02T00:00:00.000Z",
"mealType": "lunch",
"items": [
{
"name": "Paneer Butter Masala",
"category": "Main Course",
"description": "Rich and creamy paneer curry"
},
{
"name": "Jeera Rice",
"category": "Side",
"description": "Basmati rice with cumin"
}
],
"nutrition": {
"calories": 650,
"protein": 25,
"carbs": 80,
"fat": 20
},
"specialNotes": "Contains dairy",
"createdBy": "507f1f77bcf86cd799439099"
}

text

### Indexes
- `{ date: 1, mealType: 1 }`: compound index for fast "today's meals" queries

---

## 3. Feedback Model

**Collection Name:** `feedbacks`

**Purpose:** Capture real-time student ratings and comments on meals.

### Schema Structure

{
userId: ObjectId (ref: "User", required),
mealId: ObjectId (ref: "Meal", required),
ratings: {
taste: Number (1-5, required),
quantity: Number (1-5, required),
freshness: Number (1-5, required)
},
overallRating: Number (calculated average),
comment: String (max 500 chars),
sentiment: String (enum: ["positive", "neutral", "negative"]),
createdAt: Date,
updatedAt: Date
}

text

### Sample Document
{
"_id": "507f1f77bcf86cd799439013",
"userId": "507f1f77bcf86cd799439011",
"mealId": "507f1f77bcf86cd799439012",
"ratings": {
"taste": 4,
"quantity": 3,
"freshness": 5
},
"overallRating": 4.0,
"comment": "Paneer was delicious but quantity was a bit less",
"sentiment": "positive",
"createdAt": "2025-11-02T13:15:00.000Z"
}

text

### Validation Rules
- All ratings must be integers between 1-5
- One user can only rate each meal once
- Comment maximum 500 characters

### Indexes
- `{ userId: 1, mealId: 1 }`: unique compound index (prevents duplicate ratings)
- `{ mealId: 1 }`: for aggregating ratings per meal

---

## 4. Attendance Model

**Collection Name:** `attendances`

**Purpose:** Track meal attendance predictions from students.

### Schema Structure

{
userId: ObjectId (ref: "User", required),
mealId: ObjectId (ref: "Meal", required),
attending: Boolean (required),
submittedAt: Date,
createdAt: Date,
updatedAt: Date
}

text

### Sample Document
{
"_id": "507f1f77bcf86cd799439014",
"userId": "507f1f77bcf86cd799439011",
"mealId": "507f1f77bcf86cd799439012",
"attending": true,
"submittedAt": "2025-11-01T20:00:00.000Z"
}

text

### Business Logic
- Students can only select attendance for meals 1 day in advance
- Deadline: 10 PM night before for next day's meals
- One selection per user per meal

### Indexes
- `{ userId: 1, mealId: 1 }`: unique compound index
- `{ mealId: 1 }`: for counting predicted attendance

---

## 5. WasteReport Model

**Collection Name:** `wastereports`

**Purpose:** Track actual food waste after each meal for analytics.

### Schema Structure

{
mealId: ObjectId (ref: "Meal", required),
reportedBy: ObjectId (ref: "User", required),
wasteData: {
preparedQuantityKg: Number (required),
leftoverQuantityKg: Number (required),
wastePercentage: Number (calculated)
},
estimatedCost: Number,
notes: String,
reportDate: Date,
createdAt: Date,
updatedAt: Date
}

text

### Sample Document
{
"_id": "507f1f77bcf86cd799439015",
"mealId": "507f1f77bcf86cd799439012",
"reportedBy": "507f1f77bcf86cd799439099",
"wasteData": {
"preparedQuantityKg": 50,
"leftoverQuantityKg": 8,
"wastePercentage": 16
},
"estimatedCost": 240,
"notes": "Less attendance than expected",
"reportDate": "2025-11-02T15:00:00.000Z"
}

text

### Indexes
- `{ mealId: 1 }`: one report per meal
- `{ reportDate: 1 }`: for time-series analysis

---

## Database Relationships

User
├─ creates → Meal (admin only)
├─ submits → Feedback
├─ marks → Attendance
└─ reports → WasteReport (admin only)

Meal
├─ has many → Feedback
├─ has many → Attendance
└─ has one → WasteReport

text

---

## Common Queries

### Get Today's Lunch
Meal.findOne({
date: new Date().setHours(0,0,0,0),
mealType: "lunch"
})

text

### Average Ratings for a Meal
Feedback.aggregate([
{ $match: { mealId: ObjectId("...") } },
{ $group: {
_id: null,
avgTaste: { $avg: "$ratings.taste" },
avgQuantity: { $avg: "$ratings.quantity" },
avgFreshness: { $avg: "$ratings.freshness" }
}}
])

text

### Count Predicted Attendance
Attendance.countDocuments({
mealId: ObjectId("..."),
attending: true
})

text

### Weekly Waste Trend
WasteReport.find({
reportDate: {
$gte: new Date(Date.now() - 72460601000)
}
}).sort({ reportDate: 1 })

text
undefined