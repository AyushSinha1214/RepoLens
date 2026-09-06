RepoLens 🔍

RepoLens is a full-stack GitHub repository analytics platform that helps developers understand repositories through repository statistics, contributor insights, language distribution, commit activity, repository health, and AI-powered insights.

🚀 Live Demo

https://repo-lens-theta.vercel.app

✨ Features

🔎 Search and analyze public GitHub repositories

📊 Repository statistics and metadata

👥 Contributor analysis

💻 Programming language distribution

📈 Commit activity visualization

❤️ Repository health analysis

🤖 AI-powered repository insights

🔐 JWT-based user authentication

🕘 Recent repository searches using localStorage

📱 Responsive user interface

🛠️ Tech Stack

Frontend

React

Vite

Axios

CSS

Backend

Node.js

Express.js

Axios

JWT

Database

MongoDB

Mongoose

APIs & Deployment

GitHub REST API

Vercel

Render

🏗️ Architecture

React + Vite (Vercel)
        │
        ▼
Express.js API (Render)
        │
   ┌────┴─────┐
   ▼          ▼
GitHub API  MongoDB

⚙️ Local Setup

1. Clone the repository

git clone https://github.com/AyushSinha1214/RepoLens.git
cd RepoLens

2. Backend Setup

cd server
npm install
npm start

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_uri
GITHUB_TOKEN=your_github_token
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173

3. Frontend Setup

cd client
npm install
npm run dev

Create a .env file:

VITE_API_URL=http://localhost:5000

Open:

http://localhost:5173

📁 Project Structure

RepoLens/
├── client/          # React frontend
├── server/          # Express backend
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── postman/         # API collection
└── README.md

🔗 Links

Live Demo: https://repo-lens-theta.vercel.app

GitHub: https://github.com/AyushSinha1214/RepoLens

📌 Future Improvements

Advanced repository comparison

More detailed code quality metrics

Improved AI-powered recommendations

Performance optimization and caching