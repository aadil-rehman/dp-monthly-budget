# 🧾 Personal Budget Tracker

A full-stack web application that helps users track their income, expenses, and monthly budget. It features powerful data visualization using D3.js and a clean, intuitive interface built with React.

---

## 📌 Project Overview

This Personal Budget Tracker allows authenticated users to:

- Add, edit, delete financial transactions
- Categorize transactions (e.g., salary, groceries, utilities)
- Set and monitor monthly budgets
- Visualize their financial summary using D3.js charts
- Filter transactions by date, category, or amount

---

## 🧠 Assumptions

- Only registered users can add and manage their data.
- Email verification, password reset, and full user profile management are out of scope.

---

## 🛠️ Tech Stack

### Frontend

- **React.js** – Core UI framework
- **D3.js** – Interactive charts for financial summaries and budget comparisons
- **Element CSS** – Base styling
- **DaisyUI** – Component library built on Tailwind
- **React Icons** – Icon support
- **Axios** – HTTP client for API requests

### Backend

- **Node.js + Express.js** – REST API server
- **MongoDB + Mongoose** – Database and ORM for storing user and transaction data
- **JWT (jsonwebtoken)** – Authentication and authorization
- **Bcrypt** – Password hashing
- **Cookie-Parser** – Handle HTTP cookies
- **CORS** – Enable cross-origin requests
- **Validator** – Sanitize and validate user input

---

## 🔐 Authentication

Implemented using JWT tokens. Users must log in to:

- Add or manage transactions
- Set/view budgets
- See finance summary

Test Account Credentials:

- emailId - aadil@gmail.com
- password - Aadil@123

---

## 📈 Data Visualization

- **Dashboard Summary Chart (D3.js):** Total income, total expenses, and balance visualization.
- **Budget Chart (D3.js):** Monthly budget vs actual expenses comparison.

> **Note**: D3.js charting implementation was assisted using OpenAI's ChatGPT due to lack of prior experience with D3.

---

---

## 🧪 How to Run Locally

To run the project locally, follow these steps:

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/aadil-rehman/dp-monthly-budget.git
cd dp-monthly-budget
```

# Start the backend

```bash
cd server
npm install
npm start
```

- Create a .env file inside server/ with the following contents:

```bash
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
```

# Start the Frontend

```bash
cd client
npm install
npm run dev
```

- Create a .env file inside client/ with the following contents:

-REACT_APP_API_URL=http://localhost:5000

---

## 🚀 Hosted URLs

- **Frontend (Vercel):** [https://budget-tracker.vercel.app](https://budget-tracker.vercel.app)
- **Backend API (Render):** [https://dp-monthly-budget.onrender.com](https://dp-monthly-budget.onrender.com)
- **GitHub Repo – Frontend:** [https://github.com/yourusername/budget-tracker-frontend](https://github.com/yourusername/budget-tracker-frontend)
- **GitHub Repo – Backend:** [https://github.com/yourusername/budget-tracker-backend](https://github.com/yourusername/budget-tracker-backend)

## LLM Usage Acknowledgment

- The D3.js visualization logic was implemented with the assistance of OpenAI's ChatGPT to guide the integration and chart-building due to lack of prior knwoledge in D3.
- All other code (frontend, backend, styling, routing, authentication, and API logic) was written independently.
