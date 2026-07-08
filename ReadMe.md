# NoStrays

NoStrays is a school project built as a small full-stack JavaScript application for stray animal support and shelter-style workflows. It uses a Vue/Vite frontend and an Express/MongoDB backend to practice routing, authentication, API calls, database models, and user-facing pages.

The app includes pages for home/about content, signup and login, donations, messaging, volunteer/admin dashboards, animal listings, and related shelter operations.

## Tech Stack

- Vue 3
- Vite
- Vue Router
- Pinia
- Express
- MongoDB/Cosmos DB with Mongoose
- Node.js

## Project Structure

```text
NoStrays/
  backend/       Express API, auth routes, and MongoDB/Mongoose models
  frontend/      Vue 3 + Vite frontend
  MessageBoard/  Earlier Python message board experiment
```

## Prerequisites

- Node.js
- npm
- MongoDB, Cosmos DB, or another compatible MongoDB connection string

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=5001
MONGO_URI=your_mongodb_or_cosmos_connection_string
```

Start the backend:

```bash
npm run dev
```

The server defaults to `http://localhost:5001`.

## Frontend Setup

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The Vite dev server runs on `http://localhost:5173`.

## Useful Commands

From `frontend/`:

```bash
npm run build
npm run test:unit
```

From `backend/`:

```bash
npm start
npm run dev
```

## Resources

- [Sidebar Reference](https://github.com/TylerPottsDev/yt-vue-sidebar/blob/master/src/components/Sidebar.vue)

## Notes

This project was created for learning and practice. The main goal is to show experience with a JavaScript full-stack workflow: building Vue pages, setting up a Vite frontend, creating an Express server, connecting to MongoDB/Cosmos DB, and organizing models and routes for application data.
