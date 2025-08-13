# Simple To-Do Application
Build a simple To-Do application using React for the front-end and Node.js with Express for the back-end. This project allows users to add, edit, toggle completion, and delete to-do items with persistent storage on the back-end (in-memory for now).

---

## Features

- Add new to-do items
- Toggle completion status (complete/incomplete)
- Edit to-do item text inline
- Delete to-do items
- Real-time UI updates reflecting back-end changes
- RESTful API endpoints for CRUD operations
- Responsive and clean UI design

---

## Technologies Used

- **Back-end:** Node.js, Express.js, CORS
- **Front-end:** React.js (functional components with hooks)
- **Communication:** REST API using `fetch`

---

## Back-end Setup

### Requirements

- Node.js 
- npm 

### Installation & Running locally

1. Navigate to the back-end folder `/server`,initialize the back-end and install the dependencies:
```bash
cd server
npm init -y
npm install express cors dotenv   
```

2. Manually add the.gitignore file
```bash
echo "node_modules/\n.env" > .gitignore 
```

3. Modify index.js to listen on the dynamic port (important for deployment platforms):
```bash
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port${PORT}`);
});
```

4. Start the back-end server locally:
```bash
node index.js
```

5. The back-end server runs on:
  http://localhost:5000


## Deploying Backend on Render
- Render is an easy-to-use cloud platform for deploying Node.js back-end
- After deployment, Render provides a public URL: https://todoapp-dkd3.onrender.com/


---

## Front-end Setup

### Requirements

- Node.js 
- npm 

### Installation & Running locally

1. Quickly create a React front-end project named "client"
```bash
npx create-react-app client
```

2. Start the Front-end:
```bash
cd client
npm start     
```

3. The Front-end client runs on:
http://localhost:3000


---


## Environment Variables Setup
To enable flexible configuration of API URLs for both local development and production environments, this project uses a runtime configuration file alongside environment variables:

- Local development: Create a config.js file inside the React project's public directory with the following content:
```bash
window.env = { API_BASE_URL: "http://localhost:5000/api" }. 
```
This file will be loaded at runtime to provide the API base URL.

- Production deployment: Deploy the config.js file with the appropriate API URL
```bash
window.env = {API_BASE_URL: "https://todoapp-dkd3.onrender.com/api"}. 
```
This allows changing the back-end API URL dynamically without rebuilding the front-end.

- React code usage: The React app reads the API URL at runtime using:
```bash
const API_BASE_URL = window.env?.API_BASE_URL || "http://localhost:5000/api". 
```
Then all fetch requests use this variable, for example: 
```bash
fetch(${API_BASE_URL}/todos).
```

---


## API Endpoints
| Method | Endpoint         | Description                   |
| ------ | ---------------- | ----------------------------- | 
| GET    | `/api/todos`     | Retrieve all to-do items      | 
| POST   | `/api/todos`     | Add a new to-do item          | 
| PUT    | `/api/todos/:id` | Update an existing to-do item | 
| DELETE | `/api/todos/:id` | Delete a to-do item           |


## Project Structure Overview

/client
  ├─ src
  │  ├─ App.js          # Main React app component
  │  ├─ index.js        # React entry point
  │  └─ components
  │      ├─ AddTodo.jsx  # Component for adding new todos
  │      ├─ TodoItem.jsx # Individual todo item with toggle/edit/delete
  │      └─ TodoList.jsx # List rendering of all todos
/server
  └─ index.js            # Express server and API routes

## Usage
Add new tasks via the input box and click Add item.
Click the circle on the left to toggle completion status.
Click on a todo text (if incomplete) to edit inline; editing ends on blur.
Click the trash can icon on the right to delete a to-do item.
The list updates immediately reflecting the current back-end state.

## Deployment

Live Demo Front-end

Frontend is deployed on Vercel:
https://to-do-app-ochre-delta.vercel.app

## Notes
The back-end currently stores data in memory . Restarting the back-end will clear all todos.
CORS is enabled in the back-end to allow front-end requests from localhost:3000.
The app uses React functional components and hooks for state management and side effects.

## Contact
If you have any questions, suggestions, or collaboration requests, feel free to reach out:
Github: https://github.com/cindy2536/ToDoApp