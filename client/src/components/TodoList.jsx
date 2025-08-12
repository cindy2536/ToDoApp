import React from 'react';
import TodoItem from './TodoItem';

/* 
  Renders a list of TodoItem components.
  todos - Array of todo objects.
  onToggleComplete - Callback to toggle the completion status of a todo.
  onDelete - Callback to delete a todo by ID.
  onEdit - Callback to edit the text of a todo.
*/
function TodoList({ todos, onToggleComplete, onDelete, onEdit }) {
  return (
    <div>
      {/* Loop through each todo and render a TodoItem component */}
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}              // Unique key for React's reconciliation
          todo={todo}                // Pass the todo object to TodoItem
          onToggle={onToggleComplete} // Pass the toggle handler
          onDelete={onDelete}        // Pass the delete handler
          onEdit={onEdit}            // Pass the edit handler
        />
      ))}
    </div>
  );
}

export default TodoList;
