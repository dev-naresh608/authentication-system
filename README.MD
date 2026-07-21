# 🔐 JWT Authentication with Access & Refresh Tokens

A backend authentication system built with **Node.js**, **Express.js**, **MongoDB**, and **JWT**.

This project demonstrates how modern authentication works using:

- JWT Access Tokens
- JWT Refresh Tokens
- HTTP-only Cookies
- Password Hashing
- Protected Routes
- MongoDB User Authentication

---

# 🚀 Features

✅ User Registration

✅ Password Hashing (SHA-256)

✅ JWT Access Token

✅ JWT Refresh Token

✅ HTTP-only Secure Cookie

✅ Protected API

✅ Refresh Access Token

✅ MongoDB Database

---

# 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Cookie Parser
- Crypto
- dotenv

---

# 📁 Project Structure

```
src
│
├── config
│   └── config.js
│
├── controllers
│   └── auth.controller.js
│
├── models
│   └── user.model.js
│
├── routes
│   └── auth.routes.js
│
├── app.js
└── server.js
```

---

# Authentication Flow

```
          Register
              │
              ▼
      Hash Password
              │
              ▼
      Save User in MongoDB
              │
              ▼
 Generate Access Token (15 min)
              │
              ▼
Generate Refresh Token (7 Days)
              │
              ▼
Store Refresh Token in HTTP-only Cookie
              │
              ▼
 Return Access Token to Client
```

---

# Access Token

- Used for authenticated requests.
- Sent in Authorization Header.

Example

```
Authorization: Bearer ACCESS_TOKEN
```

Expiry:

```
15 Minutes
```

---

# Refresh Token

Stored securely inside an HTTP-only Cookie.

Purpose:

- Generate a new Access Token
- Keeps user logged in
- Prevents frequent login

Expiry:

```
7 Days
```

---

# API Endpoints

## Register User

```
POST /api/auth/register
```

Body

```json
{
    "username":"test",
    "email":"test@gmail.com",
    "password":"123456"
}
```

Response

```json
{
    "message":"User registered successfully",
    "user":{
        "username":"test",
        "email":"test@gmail.com"
    },
    "accessToken":"..."
}
```

---

## Get Current User

```
GET /api/auth/get-me
```

Headers

```
Authorization: Bearer ACCESS_TOKEN
```

Response

```json
{
    "message":"user fetched successfully",
    "user":{
        "username":"test",
        "email":"test@gmail.com"
    }
}
```

---

## Refresh Access Token

```
GET /api/auth/refresh-token
```

Requires

```
HTTP-only Refresh Token Cookie
```

Response

```json
{
    "message":"Access token refreshed successfully",
    "accessToken":"..."
}
```

---

# Installation

Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```

Go inside the project

```bash
cd YOUR_REPOSITORY
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=5000

MONGODB_URI=your_mongodb_connection

JWT_SECRET=your_secret_key
```

Run the project

```bash
npm run dev
```

---

# Security Notes

Current implementation includes:

- Password hashing
- JWT Authentication
- HTTP-only Cookies
- Protected Routes

Production improvements that can be added:

- bcrypt instead of SHA-256
- Refresh Token Rotation
- Email Verification
- Password Reset
- Rate Limiting
- CSRF Protection
- Input Validation
- Helmet
- CORS Configuration
- Logout with Token Invalidation

---

# Learning Outcomes

Through this project, I learned:

- How JWT Authentication works
- Difference between Access Token and Refresh Token
- Password Hashing
- HTTP-only Cookies
- Protected Routes
- Authentication Middleware
- Token Expiration
- User Authentication Flow
- MongoDB User Management

---

# Future Improvements

- Login API
- Logout API
- Role-Based Authentication
- Email Verification
- Forgot Password
- Reset Password
- Refresh Token Rotation
- OAuth (Google Login)
- Redis Token Blacklisting

---

# License

This project is created for learning purposes.