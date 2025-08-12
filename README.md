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

### Installation & Running

1. Navigate to the back-end folder /server,initialize the back-end and install the dependencies
```bash
cd server
npm init -y
npm install express cors dotenv   
```
2. Manually add the.gitignore file
```bash
cd server
echo "node_modules/\n.env" > .gitignore 
```
3. Start the back-end server:
```bash
node index.js
```
4. The back-end server runs on:
http://localhost:5000

## API Endpoints
| Method | Endpoint         | Description                   |
| ------ | ---------------- | ----------------------------- | 
| GET    | `/api/todos`     | Retrieve all to-do items      | 
| POST   | `/api/todos`     | Add a new to-do item          | 
| PUT    | `/api/todos/:id` | Update an existing to-do item | 
| DELETE | `/api/todos/:id` | Delete a to-do item           |

---

## Front-end Setup

### Requirements

- Node.js 
- npm 

### Installation & Running

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

Click the trash can icon on the right to delete a todo item.

The list updates immediately reflecting the current back-end state.

## Notes
The back-end currently stores data in memory . Restarting the back-end will clear all todos.

To extend this app, consider adding persistent storage with a database (e.g., MongoDB, PostgreSQL).

CORS is enabled in the back-end to allow front-end requests from localhost:3000.

The app uses React functional components and hooks for state management and side effects.

## Contact
If you have any questions, suggestions, or collaboration requests, feel free to reach out:
-- Github: https://github.com/cindy2536/ToDoApp.git