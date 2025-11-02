# Setup & Installation Guide

This guide will help you set up the College Mess Feedback System on your local machine.

---

## **Prerequisites**

- Node.js (v16 or higher) installed: https://nodejs.org/
- MongoDB (local OR cloud):
  - Local: https://www.mongodb.com/try/download/community
  - Cloud: https://www.mongodb.com/cloud/atlas/register
- Git installed: https://git-scm.com/
- Code editor (VS Code recommended): https://code.visualstudio.com/

---

## **Step 1: Clone the Repository**

git clone https://github.com/Ridds221/college-mess-feedback-system.git
cd college-mess-feedback-system

text

---

## **Step 2: Install Server/Backend Dependencies**

npm install

text

---

## **Step 3: Install Frontend/Client Dependencies**

cd client
npm install
cd ..

text

---

## **Step 4: Set Up Environment Variables**

Create a `.env` file in the project root:

MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
PORT=5000

text
- For **MongoDB Atlas**, use your cluster connection string: `mongodb+srv://username:password@cluster0.mongodb.net/dbname?retryWrites=true&w=majority`
- **PORT** can be 5000 (or any available port)

---

## **Step 5: Folder Structure**

college-mess-feedback-system/
├── client/ # React frontend
├── docs/ # Documentation
├── server/ # Express backend
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── middleware/
│ ├── config/
│ └── server.js
├── .env
├── README.md
├── .gitignore
└── package.json

text

---

## **Step 6: Running the Application**

**Start the backend server:**

npm run dev

text

**Start the React frontend (in a new terminal):**

cd client
npm start

text

- Server will run at: `http://localhost:5000`
- Client will run at: `http://localhost:3000`

---

## **Step 7: API Testing**

- Use **Thunder Client** (VS Code extension) or **Postman** to test API endpoints.
- Send requests to `http://localhost:5000/api/…`

---

## **Step 8: Useful VS Code Extensions**

- ESLint (linting)
- Prettier (code formatting)
- Thunder Client (API testing)
- MongoDB for VS Code

---

## **Troubleshooting**

- If you get MongoDB connection errors, confirm your URI is correct and MongoDB is running.
- Make sure `.env` is saved and not committed to git (check `.gitignore`).
- Restart terminals if you change environment variables.

---

## **Deployment (next stage)**

- Deploy backend with Render, Railway, or Heroku
- Deploy frontend with Vercel or Netlify

---

For more help, see [API Endpoints](API-ENDPOINTS.md) or [Features](FEATURES.md).