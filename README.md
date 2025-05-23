# SoftBlend Backend Development Intern Assignment 

A simple RESTful API for managing users and tasks, similar to a basic version of Trello or Todoist. Built with **Node.js**, **Express**, and **MongoDB**, with **JWT authentication** and **pagination**.


## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Using Docker (Windows)](#using-docker-windows)
- [Local Setup (Windows)](#local-setup-windows)
- [API Endpoints](#api-endpoints)
- [User APIs](#user-apis)
- [Task APIs](#task-apis)
- [Authentication](#authentication)
- [Deploy Endpoints](#deploy-endpoints)
- [Notes](#notes)

## Features

- User management: Create users, get user details, list all users.
- Task management: Create, read, update, delete tasks with optional filtering by status or assigned user.
- JWT-based authentication.
- Pagination for task listing.
- Environment variable configuration.
- Docker containerization.

## Prerequisites

- Docker Desktop (for containerized setup on Windows)
- Node.js and npm (for local setup)
- MongoDB (local or cloud instance)

## Setup Instructions

### Using Docker (Windows)

1. Clone the repository:Open Command Prompt or PowerShell, navigate to your desired directory, and run:
```bash
git clone https://github.com/krishna7054/Softblend_assignment.git
cd Softblend_assignment
```

2. Create a .env file in the project root with:PORT=3000
```bash
PORT=3000
MONGO_URI=mongodb://mongo:27017/task_management
JWT_SECRET=your_jwt_secret_key
```
Replace `your_jwt_secret_key` with a secure random string.

3. Build the Docker image:Ensure Docker Desktop is running, then execute:
```bash
docker build -t softblend-assignment .
```

4. Run a MongoDB container:
```bash
docker run -d --name mongo -p 27017:27017 mongo:latest
```

5. Run the API container:
```bash
docker run -d -p 3000:3000 --name task-api --link mongo:mongo softblend-assignment
```

6. The API will be available at http://localhost:3000.

### Local Setup (Windows)

1. Clone the repository:
```bash
git clone https://github.com/krishna7054/Softblend_assignment.git
cd Softblend_assignment
```

2. Install dependencies:
```bash
npm install
```

3. Set up MongoDB:
- Install MongoDB locally (download from MongoDB Community Server).
- Start MongoDB (e.g., run mongod in a separate Command Prompt).
- Alternatively, use MongoDB Atlas and get the connection string.

4. Create a .env file with:
```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/task_management
JWT_SECRET=your_jwt_secret_key
```

5. Start the server:
```bash
node index.js
```

For development with auto-restart:
```bash
nodemon index.js
```

6. The API will be available at http://localhost:3000.

## API Endpoints

### User APIs

- POST /users: Create a user (requires name, email, password). Returns user and JWT token.
- GET /users/:id: Get user details (requires JWT token).
- GET /users: List all users (requires JWT token).

### Task APIs

- POST /tasks: Create a task (requires title, optional description, dueDate, status, assignedUserId, and JWT token).
- GET /tasks/:id: Get task details, optionally filtered by status (requires JWT token).
- GET /tasks: List tasks with optional query params `status`, `assignedUserId`, `page`, `limit` (requires JWT token).
- PUT /tasks/:id: Update task details (requires JWT token).
- DELETE /tasks/:id: Delete a task (requires JWT token).

## Authentication

- Obtain a JWT token by creating a user via POST /users.
- Include the token in the Authorization header as Bearer <token> for protected routes.

## Deploy Endpoints

### User APIs

1. POST https://softblendassignment-production.up.railway.app/users/

   ![image](https://github.com/user-attachments/assets/f41a2614-8b7b-41e9-83e6-d71bf652a1cd)

2. GET https://softblendassignment-production.up.railway.app/users/user_id
    - HTTP Headers: `Authorization: JWT token`
     
   ![image](https://github.com/user-attachments/assets/4773b302-3601-42a4-a22f-374c7d42ed80)

4. GET https://softblendassignment-production.up.railway.app/users/
    - HTTP Headers: `Authorization: JWT token`
      
   ![image](https://github.com/user-attachments/assets/786c8183-3629-4d5a-bead-0ef7b91b7640)
   

### Task APIs

1. POST https://softblendassignment-production.up.railway.app/tasks/
    - HTTP Headers: `Authorization: JWT token`
      
   ![image](https://github.com/user-attachments/assets/6ed37639-ab61-411c-8e38-fec1a7a114e3)

2. GET https://softblendassignment-production.up.railway.app/tasks/task_id
    - HTTP Headers: `Authorization: JWT token`
      
  ![image](https://github.com/user-attachments/assets/e2300121-d22f-4e8c-be55-06a7d27945ef)

3. GET https://softblendassignment-production.up.railway.app/tasks/
    - HTTP Headers: `Authorization: JWT token`
      
   ![image](https://github.com/user-attachments/assets/045e2f71-edc6-4bd0-9c3a-49893ba6264f)

4. PUT https://softblendassignment-production.up.railway.app/tasks/task_id
    - HTTP Headers: `Authorization: JWT token`
      
   ![image](https://github.com/user-attachments/assets/6c944e5e-1dfe-4cf5-a2f5-d8d94a402961)

5. DELETE https://softblendassignment-production.up.railway.app/tasks/task_id
     - HTTP Headers: `Authorization: JWT token`
       
   ![image](https://github.com/user-attachments/assets/fd3e2787-27a2-4345-b662-2ce5a4eac4e0)


## Notes
- Ensure MongoDB is running before starting the application.
- Replace your_jwt_secret_key in .env with a secure key.
- Use a tool like Postman to test the API endpoints.
- On Windows, run commands in Command Prompt or PowerShell. Ensure Docker Desktop is running for Docker commands.

