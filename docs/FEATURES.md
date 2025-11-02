# Features & User Flows

---

## 1. Authentication & User Roles

- **Student & Admin signup/login**
- Secure authentication using JWT (JSON Web Tokens)
- Role-based access for admins and students

---

## 2. Real-time Meal Feedback

- Students rate meals on taste, quantity, freshness (1-5 stars + comments)
- Restricts one review per meal per student
- Sentiment analysis for comments (basic keyword detection: positive/negative)

---

## 3. Menu Management (Admin Only)

- Mess admins can create daily/weekly menus
- Meal types: breakfast, lunch, dinner
- Nutrition data added for health-focused analytics

---

## 4. Attendance Prediction

- Students mark meal attendance in advance (yes/no, by deadline)
- Predicts headcount for each meal (reduces over-preparation)
- Admin dashboard shows real-time and predicted attendance

---

## 5. Food Waste Reporting (Admin Only)

- Admin logs prepared quantity, leftover quantity, and notes after each meal
- Calculates waste percentage and financial impact
- Time-series trend analytics and comparisons

---

## 6. Analytics Dashboard

- Visual charts for meal ratings, attendance, and food wastage
- Weekly/monthly trend comparison
- Deep dives (filter by date, meal type)

---

## 7. Dietary Preferences

- Students set veg/non-veg, vegan, allergies in profile
- Future enhancement: personalized menu suggestions, allergen warnings

---

## 8. Notifications (Future Enhancement)

- Reminders to mark attendance before cutoff time
- Announcements of special menus or waste reduction achievements

---

## 9. Admin Panel

- User management: View, edit, disable users
- Batch menu uploads via CSV (future)
- Downloadable analytics reports (PDF/CSV)

---

## User Flows

**A. Student:**
1. Login/Register
2. View today’s menu from dashboard
3. Rate meal (taste, quantity, freshness, comment)
4. Pre-select attendance for tomorrow’s meals
5. Track personal feedback & meal history

**B. Admin:**
1. Login/Register (special link)
2. Create/edit menu for upcoming days
3. View feedback analytics for all meals
4. See predicted vs actual attendance
5. Log waste reports and view cost analysis
6. Download weekly waste/charts

---

# Future Ideas

- Push notifications (via web/app)
- Machine learning for attendance/feedback prediction
- Multi-college scalability
- Image upload for meal feedback, waste
- API for mobile app integration