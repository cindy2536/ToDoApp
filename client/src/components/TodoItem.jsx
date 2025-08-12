import React, {useState} from 'react';

/*
  TodoItem component:
  - Displays a circular checkbox on the left to toggle completion status.
  - Only clicking the circle toggles completion; clicking the text does not.
  - When completed:
    * Text shows a double line-through style.
    * Text is not editable and cursor is default.
  - When incomplete:
    * Clicking the text enables inline editing.
    * Editable input field appears with autoFocus.
  - Editing ends on input blur, triggering onEdit callback if text changed.
  - Delete button on the right is a trash can SVG icon:
     * Icon color is gray by default, changes to red on hover.
*/

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  //Local state to track if the text is being edited
  const [isEditing, setIsEditing] = useState(false);
  //Local state to hold the current text while editing
  const [editText, setEditText] = useState(todo.todotext);

  //Sizes for outer and inner circles of the checkbox
  const size = 22; // diameter of outer circle
  const borderWidth = 2; // thickness of outer ring
  const innerSize = size - borderWidth * 4; // diameter of inner filled circle

  // Styles for the outer circle (checkbox border)
  const outerStyle = {
    width: size,
    height: size,
    minWidth: size,
    borderRadius: '50%',
    border: `${borderWidth}px solid #cfcfcf`, // default border color
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxSizing: 'border-box',
    transition: 'border-color 180ms ease',
    marginRight: 12,
    flexShrink: 0,
  };

  //Styles for the inner filled circle shown when completed
  const innerStyle = {
    width: innerSize,
    height: innerSize,
    borderRadius: '50%',
    transform: todo.completed ? 'scale(1)' : 'scale(0)', //scale animation for show/hide
    opacity: todo.completed ? 1 : 0,
    transition: 'transform 160ms ease, opacity 160ms ease, background-color 200ms ease',
    backgroundColor: '#007aff', // blue fill when completed
    boxShadow: 'inset 0 -1px 0 rgba(0,0,0,0.12)', // subtle shading
  };

  // Styles for the todo text (editable or static)
  const textStyle = {
    flex: 1,
    textDecorationLine: todo.completed ? 'line-through' : 'none', // double line-through when completed
    textDecorationStyle: todo.completed ? 'double' : 'solid',
    color: todo.completed ? '#9b9b9b' : '#222', // gray when completed, black otherwise
    cursor: todo.completed ? 'default' : 'text', // text cursor only if editable
    userSelect: 'none', // prevent selection for static text
    paddingRight: 8,
  };

  // Change outer circle border color when completed
  const outerActiveStyle = todo.completed ? { borderColor: '#007aff' } : {};

  // Handler for clicking the text: enables editing if not completed
  const handleTextClick = () => {
    if (!todo.completed) {
      setIsEditing(true);
    }
  };

  // Handler for input blur: ends editing and triggers onEdit if text changed
  const handleBlur = () => {
    setIsEditing(false);
    const trimmedText = editText.trim();
    if (trimmedText && trimmedText !== todo.todotext) {
      onEdit(todo.id, trimmedText);
    } else {
      setEditText(todo.todotext); // revert if empty or unchanged
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px 0',
        borderBottom: '1px solid #eee',
      }}
    >
      {/* Checkbox circle for toggling completion */}
      <div
        role="checkbox"
        aria-checked={!!todo.completed}
        tabIndex={0}
        onClick={() => onToggle(todo.id, todo.completed)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle(todo.id, todo.completed);
          }
        }}
        style={{ ...outerStyle, ...outerActiveStyle }}
        title={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        <div style={innerStyle} />
      </div>

      {/* Editable input or static text */}
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          style={{
            flex: 1,
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '4px 6px',
          }}
        />
      ) : (
        <span onClick={handleTextClick} style={textStyle}>
          {todo.todotext}
        </span>
      )}

      {/* Delete button with trash can SVG icon */}
      <button
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete ${todo.todotext}`}
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseOver={(e) => (e.currentTarget.firstChild.style.fill = '#e74c3c')} 
        onMouseOut={(e) => (e.currentTarget.firstChild.style.fill = '#888')}    
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#888" 
          viewBox="0 0 24 24"
          width="20px"
          height="20px"
        >
          <path d="M3 6h18v2H3V6zm2 3h14v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9zm3 2v7h2v-7H8zm4 0v7h2v-7h-2zM9 4h6v2H9V4z" />
        </svg>
      </button>
    </div>
  );
}

export default TodoItem;
