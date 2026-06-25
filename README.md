# 🌿 GreenRoom

> A simple real-time global chat application built with **TypeScript, Socket.IO, PostgreSQL, Drizzle ORM, and Express**.

GreenRoom allows anyone to join a public chat room by simply entering a username—no authentication required. Messages are broadcast instantly to every connected user and are persisted in PostgreSQL, allowing newly joined users to view recent chat history.

---

LIVE - https://simplechatapp-t78a.onrender.com

## ✨ Features

* 🌍 Global public chat room
* ⚡ Real-time messaging using Socket.IO
* 👥 Live online user count
* 💾 Persistent chat history
* 🕒 Message timestamps
* 👤 Username-based chatting (No authentication)
* 📱 Responsive UI
* 🐳 Docker support for local PostgreSQL
* ☁️ Ready for deployment with Render + Neon PostgreSQL

---

## 🛠 Tech Stack

### Backend

* TypeScript
* Node.js
* Express.js
* Socket.IO
* Drizzle ORM
* PostgreSQL
* Docker

### Frontend

* HTML
* CSS
* Vanilla JavaScript

### Deployment

* Render
* Neon PostgreSQL

---

# Project Structure

```
GreenRoom
│
├── public/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── assets/
│
├── src/
│   ├── db/
│   │   ├── index.ts
│   │   └── schema.ts
│   │
│   ├── socket.ts
│   ├── server.ts
│   └── types/
│
├── drizzle/
├── drizzle.config.js
├── docker-compose.yml
├── tsconfig.json
└── package.json
```

---

# Features

### Join Chat

Enter a username and instantly join the public chat room.

---

### Real-Time Messaging

Messages are delivered instantly to every connected client using Socket.IO.

---

### Chat History

The latest 50 messages are fetched from PostgreSQL whenever a new user joins.

---

### Online Users

Displays the number of currently connected users in real time.

---

### Persistent Storage

Every message and username is stored inside PostgreSQL using Drizzle ORM.

---

# Database Schema

## Users

| Column    | Type      |
| --------- | --------- |
| id        | UUID      |
| username  | TEXT      |
| createdAt | TIMESTAMP |

---

## Messages

| Column    | Type      |
| --------- | --------- |
| id        | UUID      |
| username  | TEXT      |
| content   | TEXT      |
| createdAt | TIMESTAMP |

---

# Installation

Clone the repository

```bash
git clone https://github.com/Bharatt16/simpleChatApp.git
```

Move into the project

```bash
cd simpleChatApp
```

Install dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file.

```env
DATABASE_URL=your_postgresql_connection_string
PORT=3000
```

---

# Running PostgreSQL using Docker

Start PostgreSQL

```bash
docker compose up -d
```

Stop PostgreSQL

```bash
docker compose down
```

---

# Database Migration

Generate migrations

```bash
npx drizzle-kit generate
```

Apply migrations

```bash
npx drizzle-kit migrate
```

---

# Running the Project

Development

```bash
npm run dev
```

Production Build

```bash
npm run build
```

Run Production Server

```bash
npm start
```

---

# Deployment

The project is deployed using:

* Render (Backend)
* Neon PostgreSQL (Database)

---

# Future Improvements

* Private chat rooms
* Typing indicators
* Emoji support
* User avatars
* Message deletion
* Image sharing
* Dark / Light themes
* Read receipts
* User colors
* Infinite scrolling

---

# Learning Outcomes

This project helped me gain practical experience with:

* TypeScript
* Express.js
* Socket.IO
* Event-driven programming
* PostgreSQL
* Drizzle ORM
* Docker
* Database migrations
* Real-time applications
* Backend deployment
* Production environment variables


---

# Author

**Bharat Bhushan Rajoria**

GitHub: https://github.com/Bharatt16

---

## ⭐ If you like this project, consider giving it a star!
