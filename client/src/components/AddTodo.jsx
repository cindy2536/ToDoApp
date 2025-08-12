import React, {useState} from 'react';

// AddTodo component: Renders an input form to add a new to-do item
function AddTodo({onAdd}) {
  
  // Local state to store the current text entered by the user
  const [text, setText] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();   // Prevent default form submit behavior
    onAdd(text);          // Call the parent component's add function
    setText('');          // Clear the input field after submission
  };

  return (
    // Form for adding a new to-do item
    <form onSubmit={handleSubmit} style={{display: 'flex', marginBottom: '20px'}}>
      {/* Input field to type the new to-do item */}
      <input
        type="text"
        value={text}                             // Controlled input bound to state
        onChange={(e) => setText(e.target.value)}// Update state when user types
        placeholder="Add new item..."            // Placeholder text
        style={{
          flex: 1,
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '10px',
          marginRight: '10px',
          fontSize: '16px',
        }}
      />
      
      {/*Button to submit the form*/}
      <button
        type="submit"
        style={{
          padding: '10px 15px',
          background: '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '1rem',
          fontWeight: '600',
          letterSpacing: '0.3px',
        }}
      >
        Add item
      </button>
    </form>
  );
}

export default AddTodo;

