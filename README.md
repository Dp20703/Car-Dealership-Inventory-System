# Car Dealership Inventory System

## Project Overview

This is a full-stack Car Dealership Inventory System built using Test-Driven Development (TDD). The application serves as a complete platform for managing vehicle inventory, facilitating secure user authentication, and handling transactions like purchasing and restocking.

Elegant, test-first full-stack app for managing car inventory, sales, and restocking.

Highlights

- Built with TDD (Jest + Supertest) for reliable, well-tested code.
- Secure authentication using JWT.
- Clean separation: backend (Node/Express/MongoDB) and frontend (React + Vite + Tailwind).

Key Features

- User registration and login (JWT)
- Add, view, search, edit, and remove vehicles
- Purchase flow and inventory adjustments
- Role-based actions and secure endpoints
- Comprehensive unit and integration tests

Tech Stack

- Backend: Node.js, Express.js, MongoDB
- Frontend: React, Tailwind CSS, Vite
- Testing: Jest, Supertest
- Auth: JSON Web Tokens (JWT)

Repository Structure (high level)
\- /backend
\- .env, package.json
\- /src: app.js, server.js, config/, controllers/, middlewares/, models/, routes/, services/
\- /tests: unit/ and integration/
\- /frontend
\- package.json, tailwind.config.js, postcss.config.js
\- /src: api/, components/, context/, hooks/, pages/

Quick Start
Prerequisites: Node.js v16+, MongoDB (local or Atlas)

Backend

1. cd backend
2. npm install
3. create a .env with PORT, MONGO_URI, JWT_SECRET
4. npm run dev

Frontend

1. cd frontend
2. npm install
3. npm run dev

Testing

- From the backend folder run: npm test

### Tech Stack

- **Backend:** Node.js, Express.js, MongoDB
- **Frontend:** React, Tailwind CSS, Vite
- **Testing:** Jest, Supertest
- **Authentication:** JWT (JSON Web Tokens)

---

## Local Setup Instructions

### Prerequisites

- Node.js (v16+)
- MongoDB running locally or a MongoDB Atlas URI

### Backend Setup

1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file in the root of the backend directory and add your environment variables (PORT, MONGO_URI, JWT_SECRET).
4. Run the development server: `npm run dev`

### Frontend Setup

1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the Vite development server: `npm run dev`

---

## My AI Usage

- **AI Tool Used:** Gemini
- **How it was used:** \* I collaborated with Gemini to break down the assignment requirements and map out the technical strategy.
    - Gemini assisted in designing the initial backend folder structure to strict clean architecture and TDD standards.
    - I used Gemini to generate the initial project boilerplate, including this README and the first failing unit tests.
- **Reflection:** Using an AI assistant acted like having a senior mechanic in the bay with me; it helped organize my toolkit and set up a reliable assembly line (TDD) before I started writing the core business logic.

---

## Test Report

| File | Statements | Branches | Functions | Lines |
| | |
| src | 90.9% (10/11) | 100% (2/2) | 0% (0/1) | 90.9% (10/11) |
| src/controllers | 65.51% (38/58) | 33.33% (2/6) | 63.63% (7/11) | 65.51% (38/58) |
| src/middlewares | 81.25% (13/16) | 91.66% (11/12) | 100% (2/2) | 81.25% (13/16) |
| src/routes | 100% (13/13) | 100% (0/0) | 100% (0/0) | 100% (13/13) |
| src/services | 77.35% (41/53) | 63.63% (14/22) | 77.77% (7/9) | 83.33% (40/48) |

Contributing

- PRs welcome. Focus on tests-first changes and clear, small commits.

License

- MIT

Contact

- Project author: Darshan
