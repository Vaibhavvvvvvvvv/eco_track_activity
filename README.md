# 🌱 EcoTrack – Sustainable Living Tracker

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application that helps users track and visualize their eco-friendly activities. Users can log sustainable actions, earn eco points, track progress through interactive analytics, and unlock achievement badges.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Gamification System](#-gamification-system)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### Core Functionality
- **User Authentication** – Secure JWT-based signup and login
- **Action Logging** – Record eco-friendly activities with customizable notes
- **Points System** – Earn points based on environmental impact:
  - ♻️ Recycled: +10 points
  - 🚌 Used Public Transport: +15 points
  - 🚫 Avoided Plastic: +20 points
  - 🌳 Planted a Tree: +30 points

### Analytics & Visualization
- **Interactive Dashboard** – Real-time overview of environmental impact
- **Bar Chart** – Actions breakdown by category (Recharts)
- **Line Chart** – Weekly score growth visualization
- **Recent Activity Feed** – Chronological list of logged actions

### Gamification
- **Achievement Badges** – Dynamic badge system based on total score:
  - 🌱 **Eco Beginner** (0–50 points)
  - 🌿 **Eco Hero** (51–100 points)
  - 🌎 **Planet Protector** (101+ points)

---

## 🛠️ Tech Stack

### Backend
- **Node.js** – JavaScript runtime environment
- **Express.js** – Web application framework
- **MongoDB Atlas** – Cloud-hosted NoSQL database
- **Mongoose** – MongoDB object modeling
- **JWT** – JSON Web Tokens for authentication
- **bcryptjs** – Password hashing

### Frontend
- **React 18** – UI component library
- **React Router v6** – Client-side routing
- **Recharts** – Data visualization library
- **Axios** – HTTP client for API requests

---

## 📦 Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v14 or higher) – [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB Atlas Account** (free tier) – [Sign up](https://www.mongodb.com/cloud/atlas)
- **Git** (optional, for cloning) – [Download](https://git-scm.com/)

---

## 🚀 Installation

### 1. Clone the Repository (or navigate to the project folder)

```powershell
cd "C:\Users\niran\OneDrive\Desktop\fullstack project"
```

### 2. Install Dependencies

#### Backend (Server)
```powershell
cd server
npm install
```

#### Frontend (Client)
```powershell
cd ../client
npm install
```

#### Root (Optional - for concurrent startup)
```powershell
cd ..
npm install
```

---

## ⚙️ Configuration

### 1. MongoDB Atlas Setup

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database user with read/write permissions
3. Whitelist your IP address (or use `0.0.0.0/0` for development)
4. Copy the connection string

### 2. Environment Variables

Create a `.env` file in the **server** directory:

```env
# MongoDB Connection
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/ecotrack?retryWrites=true&w=majority

# JWT Secret (use a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here

# Server Port
PORT=5000
```

**Optional:** Create a `.env` file in the **client** directory (only if API URL differs):

```env
REACT_APP_API_URL=http://localhost:5000/api
```

> ⚠️ **Security Note:** Never commit `.env` files to version control. Use `.env.example` as a template.

---

## 🏃 Running the Application

### Option 1: Manual Start (Recommended for Development)

#### Terminal 1 – Start Backend Server
```powershell
cd server
node index.js
```

**Expected Output:**
```
MONGO_URI: mongodb+srv://...
PORT: 5000
Connected to MongoDB
Server running on port 5000
```

#### Terminal 2 – Start Frontend React App
```powershell
cd client
npm start
```

**Expected Output:**
```
Compiled successfully!
Local:            http://localhost:3000
On Your Network:  http://192.168.x.x:3000
```

The application will automatically open in your default browser at `http://localhost:3000`.

### Option 2: Concurrent Start (Using Concurrently)

From the project root:

```powershell
npm run start:dev
```

This starts both backend and frontend simultaneously.

---

## 📡 API Documentation

### Authentication Endpoints

#### POST `/api/auth/signup`
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "name": "John Doe",
    "email": "john@example.com",
    "totalScore": 0
  }
}
```

#### POST `/api/auth/login`
Authenticate existing user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:** Same as signup response.

---

### Action Endpoints

#### GET `/api/actions`
Retrieve all actions for authenticated user.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "actions": [
    {
      "_id": "64f...",
      "category": "PlantedTree",
      "points": 30,
      "note": "Planted oak tree in community garden",
      "date": "2025-10-23T10:30:00.000Z"
    }
  ],
  "totalScore": 150
}
```

#### POST `/api/actions`
Log a new eco-friendly action.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "category": "Recycled",
  "note": "Recycled 5 plastic bottles",
  "date": "2025-10-23T14:00:00.000Z" // Optional, defaults to now
}
```

**Response:**
```json
{
  "action": {
    "_id": "64f...",
    "user": "64f1a2b3c4d5e6f7g8h9i0j1",
    "category": "Recycled",
    "points": 10,
    "note": "Recycled 5 plastic bottles",
    "date": "2025-10-23T14:00:00.000Z"
  }
}
```

#### GET `/api/actions/stats`
Retrieve analytics data for charts.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "counts": {
    "Recycled": 12,
    "PublicTransport": 8,
    "AvoidedPlastic": 5,
    "PlantedTree": 3
  },
  "weekly": [
    { "week": "2025-10-14", "points": 45 },
    { "week": "2025-10-21", "points": 70 }
  ]
}
```

---

## 📁 Project Structure

```
fullstack project/
├── client/                 # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   ├── Dashboard.js
│   │   │   └── AddAction.js
│   │   ├── utils/
│   │   │   └── api.js      # Axios instance with auth interceptor
│   │   ├── App.js          # Main app with routing
│   │   ├── index.js        # Entry point
│   │   └── index.css       # Global styles
│   └── package.json
│
├── server/                 # Express backend
│   ├── controllers/
│   │   ├── authController.js
│   │   └── actionController.js
│   ├── middleware/
│   │   └── auth.js         # JWT verification
│   ├── models/
│   │   ├── User.js
│   │   └── Action.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── actions.js
│   ├── index.js            # Server entry point
│   ├── .env                # Environment variables (not committed)
│   └── package.json
│
├── .env.example            # Template for environment variables
├── .gitignore
├── package.json            # Root package for concurrently
└── README.md
```

---

## 🎮 Gamification System

### Point Values

| Action Type | Points Awarded | Icon |
|------------|----------------|------|
| Recycled | +10 | ♻️ |
| Used Public Transport | +15 | 🚌 |
| Avoided Plastic | +20 | 🚫 |
| Planted Tree | +30 | 🌳 |

### Badge Progression

```
Total Score    →  Badge
───────────────────────────────
0 - 50         →  🌱 Eco Beginner
51 - 100       →  🌿 Eco Hero
101+           →  🌎 Planet Protector
```

Badges are displayed dynamically on the dashboard and update in real-time as users earn points.

---

## 🐛 Troubleshooting

### Common Issues

#### 1. **Port Already in Use (EADDRINUSE)**
**Error:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**
```powershell
# Kill all Node.js processes
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force

# Then restart the server
cd server
node index.js
```

#### 2. **MongoDB Connection Failed**
**Error:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solution:**
- Verify `MONGO_URI` in `server/.env` is correct
- Check MongoDB Atlas IP whitelist settings
- Ensure database user credentials are correct

#### 3. **React Scripts Not Found**
**Error:** `'react-scripts' is not recognized`

**Solution:**
```powershell
cd client
npm install react-scripts@5.0.1 --save
npm start
```

#### 4. **CORS Errors in Browser Console**
**Error:** `Access-Control-Allow-Origin header is missing`

**Solution:**
- Ensure backend server is running on port 5000
- Verify `cors` is enabled in `server/index.js`
- Check `REACT_APP_API_URL` matches backend URL

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **MongoDB Atlas** – Cloud database hosting
- **Recharts** – Elegant charting library
- **React Team** – For the amazing UI library
- **Express.js** – Fast, unopinionated web framework

---

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Email: support@ecotrack.example.com

---

**Built with 💚 for a sustainable future**
