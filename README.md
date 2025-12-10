# 🎓 EduGraph

EduGraph is a MERN-stack web application that helps **teachers manage student semester marks** and allows **students to view their academic performance** through clean reports and interactive line graphs.

---

## ✨ Features

### 👨‍🏫 For Teachers
- Add, edit, and delete **students**
- Add and update **semester-wise marks** for each student
- View all students with their summary performance
- Manage subjects for each semester

### 👨‍🎓 For Students
- Secure login to view own marks
- View **semester-wise reports**
- Visualize performance using **line graphs**
- Understand trends in improvement or decline

### ⚙️ General
- Secure authentication (JWT / token-based, depending on your implementation)
- RESTful API using Node.js + Express
- MongoDB for storing users, students, and marks
- Responsive frontend built with React

---

## 🧰 Tech Stack

- **Frontend:** React (JavaScript), React Router, Axios (or Fetch), Chart/Graph library (e.g., Chart.js / Recharts)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Local or MongoDB Atlas)
- **Others:** 
  - JSON Web Token (JWT) or other auth mechanism
  - dotenv for environment variables

*(Update this list if you’re using specific libraries like Vite, CRA, Tailwind, etc.)*

---

## 📁 Project Structure (example)

```bash
EduGraph/
├── client/           # React frontend
│   ├── src/
│   ├── package.json
│   └── ...
├── server/           # Node.js + Express backend
│   ├── src/ or routes/controllers/models
│   ├── package.json
│   └── ...
├── README.md
└── ...
