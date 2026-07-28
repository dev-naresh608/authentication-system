# 🔐 Authentication System

A complete backend authentication system built with **Node.js**, **Express.js**, **MongoDB**, and **JWT** following the **MVC Architecture**.

This project demonstrates a production-style authentication workflow including email verification, session management, JWT authentication, refresh tokens, secure cookies, and device logout functionality.

---

## ✨ Features

- 👤 User Registration
- 🔑 User Login
- ✉️ Email OTP Verification
- 🔐 JWT Authentication
- ♻️ Access Token & Refresh Token
- 🍪 HTTP-only Secure Cookies
- 📧 Gmail OAuth2 Email Service (Nodemailer)
- 🗂 Session Management
- 🔒 Refresh Token Hashing
- 🚪 Logout Current Device
- 🌍 Logout From All Devices
- 🛡 Protected Routes
- 🏗 MVC Folder Structure
- ⚙ Environment Variable Validation

---

# 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express.js | Backend Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| Nodemailer | Email Service |
| Gmail OAuth2 | Email Authentication |
| Cookie Parser | Cookie Handling |
| Crypto | Password & Token Hashing |
| Dotenv | Environment Variables |
| Morgan | Logging |

---

# 📁 Project Structure

```
src
│
├── config
│   ├── config.js
│   └── db.js
│
├── controllers
│   └── auth.controller.js
│
├── models
│   ├── user.model.js
│   ├── session.model.js
│   └── otp.model.js
│
├── routes
│   └── auth.routes.js
│
├── services
│   └── email.service.js
│
├── utils
│   └── utils.js
│
├── app.js
└── server.js
```

---

# 🔄 Authentication Flow

```
          Register
              │
              ▼
     Hash Password
              │
              ▼
      Store User
              │
              ▼
 Generate 6 Digit OTP
              │
              ▼
 Hash OTP & Save
              │
              ▼
 Send OTP Email
              │
              ▼
 Verify Email
              │
              ▼
 Login
              │
              ▼
 Generate Access Token
              │
              ▼
 Generate Refresh Token
              │
              ▼
 Store Refresh Token Hash
              │
              ▼
 Create User Session
              │
              ▼
 Set HTTP-only Cookie
              │
              ▼
 Protected APIs
```

---

# 🔑 Authentication Tokens

## Access Token

- Used for protected APIs
- Sent using Authorization Header

```
Authorization: Bearer ACCESS_TOKEN
```

Expiry

```
15 Minutes
```

---

## Refresh Token

Stored securely as an HTTP-only cookie.

Used for

- Creating new access tokens
- Maintaining user sessions
- Device authentication

Expiry

```
7 Days
```

---

# 📮 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/get-me` | Get authenticated user |
| GET | `/api/auth/refresh-token` | Generate new access token |
| GET | `/api/auth/logout` | Logout current device |
| GET | `/api/auth/logout-all` | Logout from all devices |
| GET | `/api/auth/verify-email` | Verify email using OTP |

---

# 🚀 Getting Started

Clone the repository

```bash
git clone https://github.com/dev-naresh608/authentication-system.git
```

Move into the project

```bash
cd authentication-system
```

Install dependencies

```bash
npm install
```

Create a `.env`

```env
PORT=5000

MONGO_URI=

JWT_SECRET=

GOOGLE_USER=

GOOGE_CLIENT_ID=

GOOGLE_CLIENT_SECRET=

GOOGLE_REFRESH_TOKEN=
```

Run the server

```bash
npm start
```

---

# 🔒 Security Features

- Password Hashing
- JWT Authentication
- Refresh Token Hashing
- HTTP-only Cookies
- Email Verification
- Session Tracking
- Environment Validation

---

# 📚 Learning Outcomes

During this project, I learned about

- JWT Authentication
- Access & Refresh Tokens
- Email OTP Verification
- Nodemailer with Gmail OAuth2
- Session Management
- Secure Cookies
- MongoDB Relationships
- MVC Architecture
- Authentication Flow Design
- Token-Based Authentication
- Environment Configuration

---

# 🚀 Future Improvements

- bcrypt Password Hashing
- Refresh Token Rotation
- Password Reset via Email
- Role-Based Authorization
- Authentication Middleware
- Rate Limiting
- Zod Validation
- Helmet Security
- Redis Session Store
- Docker Support
- Swagger Documentation
- Unit Testing

---

# 🙏 Acknowledgements

This project was built while learning backend authentication concepts.

**Learning Resource:** ❤️ **Sheryians Coding School**

Special thanks to the instructors for explaining authentication, JWT, email verification, and backend architecture in a practical way.

---

# 📄 License

This project is intended for educational and learning purposes.

---

<div align="center">

### ⭐ If you found this project useful, consider giving it a star!

Made with ❤️ by **Naresh Chaudhary**

</div>