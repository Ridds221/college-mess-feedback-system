# API Endpoints

## Overview
This document lists all RESTful API endpoints for the College Mess Feedback System backend.

---

## **Authentication**

| Method | Endpoint          | Description             | Access        |
|--------|-------------------|------------------------|--------------|
| POST   | /api/auth/register | Register (student, admin) | Public       |
| POST   | /api/auth/login    | Login                  | Public       |

---

## **User Management**

| Method | Endpoint         | Description                | Access         |
|--------|------------------|---------------------------|----------------|
| GET    | /api/users/me    | Get current user profile  | Authenticated  |
| PUT    | /api/users/me    | Update profile/details    | Authenticated  |

---

## **Meal Management (Admin only)**

| Method | Endpoint             | Description              | Access        |
|--------|----------------------|-------------------------|---------------|
| GET    | /api/meals/today     | Get today’s menu         | All users     |
| GET    | /api/meals/:id       | Get details of one meal  | All users     |
| POST   | /api/meals           | Create new meal/menu     | Admin only    |
| PUT    | /api/meals/:id       | Update meal/menu         | Admin only    |
| DELETE | /api/meals/:id       | Delete meal/menu         | Admin only    |

---

## **Meal Feedback**

| Method | Endpoint                  | Description                   | Access        |
|--------|---------------------------|-------------------------------|---------------|
| POST   | /api/feedback             | Submit feedback/rating        | Student       |
| GET    | /api/feedback/meal/:mealId| Get feedback for one meal     | All users     |
| GET    | /api/feedback/user/:userId| Get feedback by user          | Authenticated |
| GET    | /api/feedback/summary/:mealId | Avg ratings & stats         | All users     |

---

## **Attendance Prediction**

| Method | Endpoint                  | Description                | Access         |
|--------|---------------------------|----------------------------|----------------|
| POST   | /api/attendance           | Student marks attendance   | Student        |
| GET    | /api/attendance/meal/:mealId | Get attendance for meal | Admin          |
| GET    | /api/attendance/prediction/:mealId | Predicted count      | Admin          |

---

## **Waste Reporting (Admin only)**

| Method | Endpoint                  | Description                 | Access         |
|--------|---------------------------|-----------------------------|----------------|
| POST   | /api/waste                | Log waste for a meal        | Admin          |
| GET    | /api/waste/meal/:mealId   | Get waste report for meal   | Admin          |
| GET    | /api/waste/analysis/weeks | Analytics (weekly trends)   | Admin          |

---

## **Analytics Dashboard**

| Method | Endpoint                      | Description                  | Access        |
|--------|-------------------------------|------------------------------|---------------|
| GET    | /api/analytics/feedback       | Get feedback analytics       | Admin         |
| GET    | /api/analytics/attendance     | Get attendance analytics     | Admin         |
| GET    | /api/analytics/waste          | Get waste analytics          | Admin         |

---

## **General**

- All endpoints prefixed with `/api/`
- All POST/PUT requests expect JSON payloads
- Auth tokens (JWT) required for protected routes (sent in request header)
- 401/403 errors for unauthorized/invalid access
