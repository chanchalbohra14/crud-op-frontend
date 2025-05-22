# crud-op-frontend

A full-stack CRUD application built with React (frontend) and Node.js/Express (backend).  
This app enables users to create, view, update, and delete member records with form validation.

---

## Features

- Create new members with validation using react-hook-form  
- View list of members  
- Update member information  
- Delete members  
- Axios for REST API communication  

---

## Tech Stack

Frontend: React, Vite, Axios, React Hook Form, CSS  
Backend: Node.js, Express, MongoDB (assumed)  

---

## Project Structure

The project is divided into frontend and backend folders:

- frontend/src/components/  
  - MemberForm.jsx (Create)  
  - MemberList.jsx (Read)  
  - EditMember.jsx (Update)  
  - DeleteMember.jsx (Delete)  
- backend/ (Node.js API with Express, routes, controllers, and models)  

---

## Environment Variables

Create a `.env` file inside the `frontend` folder containing:

`VITE_BACKEND_URL=http://localhost:5000`

Replace the URL with your deployed backend URL when ready for production.

---

## Running the Project Locally

1. Clone the repository:  
`git clone https://github.com/your-username/crup-op-frontend.git`  
`cd crup-op-frontend`

3. Start the backend server:  
`cd backend`  
`npm install`  
`npm run server`  
Backend runs at `http://localhost:8000`

4. Start the frontend app:  
`cd frontend`  
`npm install`  
`npm run dev`  
Frontend runs at `http://localhost:5173`

---

## Deployment Recommendations

- Frontend can be deployed on Netlify or Vercel  
- Backend can be deployed on Render 


-

