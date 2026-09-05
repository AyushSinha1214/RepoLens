# RepoLens — GitHub Repository Analytics

> A full-stack GitHub analytics platform for exploring repository statistics, contributors, languages, commit activity, repository health, and AI-powered insights.

## Tech Stack

* **Frontend:** React, Vite, React Router, Axios, Recharts
* **Backend:** Node.js, Express.js
* **API:** GitHub REST API
* **Database:** MongoDB *(if authentication/database features are enabled)*

---

## Prerequisites

Make sure you have these installed:

* [Node.js](https://nodejs.org/) — includes npm
* [Git](https://git-scm.com/)
* A **GitHub account**
* **VS Code** *(recommended)*

Check installations:

```bash
node -v
npm -v
git --version
```

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/AyushSinha1214/RepoLens.git
cd RepoLens
```

### 2. Install dependencies

**Frontend:**

```bash
cd client
npm install
```

**Backend:**

```bash
cd ../server
npm install
```

`npm install` automatically installs all required packages from `package.json`.
You do **not** need to install React, Express, Axios, Recharts, etc. separately.

---

## GitHub API Token

RepoLens uses the GitHub API to fetch repository data. A **GitHub Personal Access Token** is recommended to avoid API rate-limit issues.

### Create a token

Go to:

**GitHub → Settings → Developer settings → Personal access tokens**

Create a token with the minimum permissions required for the project.

### Add the token

Create:

```text
server/.env
```

Add:

```env
PORT=5000
GITHUB_TOKEN=your_github_token
```

**Never upload `.env` or your GitHub token to GitHub.**

Make sure `.env` is included in `.gitignore`.

---

## MongoDB

MongoDB is only required if you are using RepoLens features that need a database, such as authentication or user accounts.

If required, add your MongoDB connection string to `server/.env`:

```env
MONGO_URI=your_mongodb_connection_string
```

---

## Run the Project

RepoLens has a frontend and backend, so run them in **two terminals**.

### Terminal 1 — Backend

```bash
cd RepoLens/server
npm run dev
```

Backend:

```text
http://localhost:5000
```

### Terminal 2 — Frontend

```bash
cd RepoLens/client
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Open **http://localhost:5173** in your browser.

---

## Quick Setup

```bash
git clone https://github.com/AyushSinha1214/RepoLens.git
cd RepoLens

cd client
npm install

cd ../server
npm install
```

Then create `server/.env`, add your GitHub token, and run the frontend and backend in separate terminals.

---

## Security

Never commit or share:

```text
.env
GitHub tokens
MongoDB passwords
API keys
JWT secrets
```

If a token is accidentally exposed, **revoke it immediately and generate a new one**.

---

## Author

**Ayush Sinha**
B.Tech Computer Science Engineering

[GitHub](https://github.com/AyushSinha1214)
