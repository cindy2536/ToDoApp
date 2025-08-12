//Import React and its hooks
import React, {useState, useEffect} from 'react';
//Import components for adding todos and displaying the list
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

function App() {
  //State variable to store the list of todo items
  const [todoItems, setTodoItems] = useState([]);

  //Fetch initial todo items from server on first component mount
  useEffect(() => {
    fetch('http://localhost:5000/api/todos')
      //Check HTTP status code before parsing JSON to catch server errors like 404 or 500
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      //Update the todoItems state with fetched data
      .then((data) => setTodoItems(data))
      //Catch any network or parsing errors
      .catch((err) => console.error("Error loading todos:", err));
  }, []);

  //Add a new to-do item
  const addTodo = async (text) => {
    if (!text.trim()) return; // Ignore empty input

    try {
      //Send POST request to server to create a new todo
      const res = await fetch('http://localhost:5000/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ todotext: text }),
      });
      const newTodo = await res.json();
      // Append the new todo to the current list
      setTodoItems((prev) => [...prev, newTodo]);
    } catch (err) {
      console.error('Error adding todo:', err);
    }
  };

  // Toggle the completion status of a todo item
  const toggleComplete = async (id, currentStatus) => {
    try {
      // Send PUT request to update the completed status
      const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({completed: !currentStatus}),
      });
      const updatedTodo = await res.json();
      // Update the todo item in the state
      setTodoItems((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch (err) {
      console.error('Error updating todo:', err);
    }
  };

  // Edit the text of a todo item
  const editTodo = async (id, newText) => {
    if (!newText.trim()) return; // Ignore empty text

    try {
      // Send PUT request to update the todo text
      const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ todotext: newText }),
      });
      const updatedTodo = await res.json();
      // Update the todo item in the state
      setTodoItems((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch (err) {
      console.error('Error editing todo:', err);
    }
  };

  // Delete a todo item by id
  const deleteTodo = async (id) => {
    try {
      // Send DELETE request to server
      await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: 'DELETE',
      });
      // Remove the deleted item from state
      setTodoItems((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  return (
    <div
      style={{
        maxWidth: 550,
        margin: '30px auto',
        padding: '40px',
        borderRadius: '10px',
        background: '#fff',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1 style={{ textAlign: 'center', color: '#333' }}>To-Do List</h1>

      {/* Component for adding a new todo */}
      <AddTodo onAdd={addTodo} />

      {/* Show a placeholder message if the todo list is empty */}
      {todoItems.length === 0 ? (
        <p
          style={{
            textAlign: 'left',
            color: '#aaa',
            fontSize: '0.9rem',
            fontStyle: 'italic',
          }}
        >
          No to-dos are available, add one to get started!
        </p>
      ) : (
        /* Component rendering the list with toggle, delete and edit handlers */
        <TodoList
          todos={todoItems}
          onToggleComplete={toggleComplete}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
      )}
    </div>
  );
}

export default App;
