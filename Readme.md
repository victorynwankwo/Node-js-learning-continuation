## LEARNING NODE JS

### 📚 My Growth Journey

This repository is my Node.js learning journal. I document the skills I build, the concepts I practice, and the real bugs I fix as I grow as a backend developer.

### 🚀 What I’m Learning

- Node.js basics: modules, routing, middleware, and server setup
- Express routing and how `app.use()` expects middleware/router functions
- Organizing code into controllers, routes, middleware, and config files
- Working with `bcryptjs` for password hashing and authentication flows
- Fixing export/import mistakes like `module.exports` vs `module.export`
- Debugging runtime errors from invalid route handlers and bad route mounting

### 🧩 Project Structure

- `server.js` – main app entry point
- `htttp.js` – experimental server logic and routing practice
- `routes/` – modular route definitions for root, subdir, auth, register, and API endpoints
- `controllers/` – request handler logic for authentication, registration, and employees
- `middleware/` – custom middleware for logging and error handling
- `config/` – configuration settings such as CORS options
- `public/` – static files, styles, images, and text resources
- `views/` – HTML pages for the site and nested folders
- `model/` – sample JSON data for users and employees

### 🔧 What I Have Built So Far

- A Node.js app with routes for different pages and API endpoints
- User registration with hashed passwords using `bcryptjs`
- Login route with password validation and proper controller export
- Custom middleware and static asset serving
- JSON data handling for sample employee and user data
- Better route mounting after fixing invalid mounts like duplicate `/register` usage

### 🎯 Current Focus

- Fixing bugs and improving route handler behavior
- Learning how Express middleware and routers work together
- Documenting each coding lesson clearly in the repository
- Expanding from static JSON files toward real backend functionality

### 📌 Run the Project

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm run dev
   ```


_*This README is a personal learning log for my Node.js journey.*_
