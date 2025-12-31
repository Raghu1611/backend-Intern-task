# Professional Backend API & Frontend UI Task using MERN Stack

**Backend Developer Intern Assessment Project**

This repository contains a full-stack web application built to demonstrate a scalable, secure, and modular REST API with a modern React frontend. It implements robust Authentication (JWT), Role-Based Access Control (RBAC), and full CRUD operations for a secondary entity (Tasks).

## 🚀 Overview

The goal of this project is to showcase backend proficiency including API design, security best practices (password hashing, sanitization), and database modeling, while providing a clean, professional user interface for interaction.

**Key Features:**
*   **Authentication:** Secure User Registration & Login (JWT + Bcrypt).
*   **Authorization:** Role-Based Access Control (RBAC) distinguishing `user` and `admin` roles.
*   **CRUD Operations:** Create, Read, Update, Delete functionality for Tasks.
*   **Security:** Input validation, Helmet (Security Headers), CORS configuration.
*   **Documentation:** Comprehensive API documentation (Postman) and Code Logic.
*   **UI:** Responsive, dark-themed React Dashboard with toast notifications.

---

## 🛠 Tech Stack

### Backend
*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Database:** MongoDB (via Mongoose ODM)
*   **Authentication:** JSON Web Tokens (JWT)
*   **Encryption:** Bcryptjs
*   **Architecture:** MVC (Model-View-Controller) pattern regarding Separation of Concerns.

### Frontend
*   **Library:** React.js (Vite)
*   **State Management:** React Context API (Auth)
*   **Routing:** React Router DOM
*   **HTTP Client:** Axios (Interceptors for Bearer Token injection)
*   **Styling:** Modern CSS3 (Variables, Flexbox, Grid), Lucide Icons.

### Dev Tools
*   **API Dev:** Postman (Collection included)
*   **Logging:** Morgan (Dev logging)
*   **Hot Reload:** Nodemon (Backend), HMR (Frontend)

---

## 📂 Project Architecture

### Backend Structure (`/backend`)
```bash
/config         # Database connection logic
/controllers    # Core business logic (Auth, Tasks) - Handles Request/Response
/middleware     # Interceptors (Auth verification, Error handling, Roles)
/models         # Mongoose Data Schemas and Validation
/routes         # API Route definitions mounted to Server
/utils          # Helper classes (ErrorResponse)
server.js       # App entry point, middleware setup, DB connection
```

### Frontend Structure (`/frontend`)
```bash
/src
  /components   # Reusable UI components (Buttons, Inputs)
  /context      # Global State Stores (AuthContext for user session)
  /pages        # Application Views (Login, Register, Dashboard)
  api.js        # Axios instance configuration
  App.js        # Main Router setup
  index.css     # Global Theme & Design System
```

---

## ⚙️ Prerequisites

Ensure you have the following installed on your machine:
*   [Node.js](https://nodejs.org/) (v16 or higher)
*   [MongoDB](https://www.mongodb.com/try/download/community) (Locally running or Atlas URI)
*   [Git](https://git-scm.com/)

---

## 🔐 Environment Variables

You need to set up environment variables for the backend to function correctly.
1.  Navigate to `backend/` folder.
2.  Create a file named `.env`.
3.  Copy the contents from `.env.example` (shown below).

**`.env` Example:**
```properties
PORT=5000
MONGO_URI=mongodb://localhost:27017/interntask
JWT_SECRET=your_super_secret_jwt_key_here
```

> **❗ IMPORTANT:** The `.env` file contains sensitive secrets and is ignored by Git (`.gitignore`). **Never** commit it to a public repository.

---

## 🚀 Setup & Installation Instructions

Follow these steps to get the project running from scratch.

### 1. Clone the Repository
```bash
git clone <repository_url>
cd Interntask
```

### 2. Backend Setup
1.  Navigate to the backend folder:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Ensure MongoDB is running locally (or use your Atlas URI in `.env`).
4.  Start the Development Server:
    ```bash
    npm run dev
    ```
    *The server should start on `http://localhost:5000`.*

### 3. Frontend Setup
1.  Open a new terminal and navigate to the frontend folder:
    ```bash
    cd ../frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the Development Server:
    ```bash
    npm run dev
    ```
    *The application is now accessible at `http://localhost:5173`.*

---

## 📖 API Documentation

The full API documentation is available via **Postman Collection**.
1.  Locate the file `InternTask.postman_collection.json` in the root directory.
2.  Open Postman -> Import -> Upload the file.
3.  The collection "Intern Task API" will appear with pre-configured requests.

**Core Endpoints:**

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | Register new user | ❌ |
| `POST` | `/api/v1/auth/login` | Login user & Get Token | ❌ |
| `GET` | `/api/v1/auth/me` | Get current user details | ✅ |
| `GET` | `/api/v1/tasks` | Get all tasks | ✅ |
| `POST` | `/api/v1/tasks` | Create a new task | ✅ |
| `PUT` | `/api/v1/tasks/:id` | Update task status | ✅ |
| `DELETE` | `/api/v1/tasks/:id` | Delete a task | ✅ |

---

## 🛡 Security Practices Implemented

1.  **Password Hashing:** Passwords are never stored in plain text. We use `bcryptjs` to hash passwords before saving them to the DB.
2.  **JWT Authentication:** Stateless authentication using JSON Web Tokens.
3.  **Role-Based Access (RBAC):** Middleware checks strict user roles. Admin logic is prepared in the backend structure.
4.  **NoSQL Injection Protection:** Mongoose sanitization helps prevent basic injection attacks.
5.  **Secure Headers:** `helmet` middleware is used to set secure HTTP headers.
6.  **CORS:** Configured to allow requests from the frontend domain.

---

## 📈 Scalability & Future Improvements

This project is built with scalability in mind:

*   **Modular Architecture:** The `controller-service` pattern allows logic to be separated easily.
*   **Microservices Ready:** The functionality (Auth vs Tasks) is decoupled enough to be split into separate microservices (`auth-service`, `task-service`) behind an API Gateway in the future.
*   **Caching (Optional):** Redis can be integrated to cache `GET /tasks` requests to reduce DB load for read-heavy applications.
*   **Containerization:** A `Dockerfile` can be added to containerize the app for orchestration via Kubernetes or AWS ECS.

---

## 📦 Deployment (Optional)

Deployment is not strictly required for this assignment, but the app is "Deployment Ready".
*   **Backend:** Can be deployed to Render, Railway, or Heroku.
*   **Frontend:** Can be deployed to Vercel or Netlify.
*   **DB:** MongoDB Atlas.

---

## 📝 Submission Notes

*   **Logging:** The backend uses `morgan` to log HTTP requests to the console for easier debugging/auditing.
*   **Testing Roles:** You can manually update the `role` field of a user in MongoDB to `admin` to test Admin-specific routes (if refined further in future updates).
*   **Postman:** Don't forget to use the provided JSON collection for testing!

***
*Developed by Intern Candidate*
