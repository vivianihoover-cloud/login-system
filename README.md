# Login System with Custom Backend

A simple login and signup system with a Node.js/Express backend and in-memory user storage.

## Features

- Sign in flow
- Create account flow
- Duplicate username rejection
- Passwords stored as SHA-256 hashes
- No external dependencies like Google Sheets

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000`

3. Open `http://localhost:3000` in your browser.

## Pre-loaded User

Username: `兰曦`
Password: `Th0r0dins0n!_OWNER`

## How it works

- Frontend is in the `public/` directory
- Backend is `server.js`
- Users are stored in-memory (they reset when the server restarts)
- All passwords are hashed with SHA-256 before storage
- Duplicate usernames are rejected automatically

## Notes

- This is a demo with in-memory storage. For production, use a database like MongoDB or PostgreSQL.
- To persist data, replace the `users` array with a real database.
