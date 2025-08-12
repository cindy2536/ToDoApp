//Import required modules 
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

//Enable cors and json body parsing
app.use(cors());
app.use(express.json());
//In-memory storage for to-do items
let todos = [];
let nextId = 1;

//Routes 

//GET -- Retrieve all to-do items
app.get('/api/todos', (req, res) => {
  console.log("Get all todos");
  res.json(todos);
});

//POST -- Create a new to-do item
app.post('/api/todos', (req, res) => {
  const { todotext, completed = false } = req.body;
  //Checks if todotext is missing or empty
  if (!todotext) {
    return res.status(400).json({ error: 'To-do text is required' });
  }

  //Create a new to-do item and store
  const newTodo = {id: nextId++, todotext, completed};
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

//PUT -- Update an existing to-do item's text or completion status by ID
app.put('/api/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  const {todotext, completed} = req.body;
  // Find the to-do item by ID
  const todo = todos.find(t => t.id === todoId);
  if (!todo) return res.status(404).json({ error: 'Todo is not found' });
  //Update fields 
  if (todotext !== undefined) todo.todotext = todotext;
  if (completed !== undefined) todo.completed = completed;
  res.json(todo);
});

//DELETE --remove a to-do item by ID
app.delete('/api/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);

  //Find the index of the item to delete
  const index = todos.findIndex(t => t.id === todoId);
  if (index === -1) return res.status(404).json({ error: 'Todo is not found' });

  //Remove one item from the array at the given index
  const deleted = todos.splice(index,1);

  //Send the deleted item back to the client as a json response
  res.json(deleted[0]);
});

//Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
