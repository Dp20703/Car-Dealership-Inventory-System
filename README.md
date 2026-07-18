# Car Dealership Inventory System

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

AI Collaboration
- Tool used: Gemini
- How: planning, initial scaffolding, test-first guidance

Test Report (summary)
| Area            | Coverage (approx) |
|-----------------|-------------------|
| Controllers     | ~69%              |
| Middlewares     | ~81%              |
| Models          | ~33%              |
| Routes          | 100%              |
| Services        | ~83%              |

Contributing
- PRs welcome. Focus on tests-first changes and clear, small commits.

License
- MIT

Contact
- Project author: Darshan

