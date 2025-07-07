import React from 'react';

// PUBLIC_INTERFACE
// Sidebar lists all notes and allows selecting, creating or deleting a note.
export default function Sidebar({
  notes,
  selectedId,
  onSelect,
  onCreate,
  onDelete
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Notes</h2>
        <button title="Add note" onClick={onCreate}>＋</button>
      </div>
      <ul className="notes-list">
        {notes.map(note => (
          <li 
            className={note.id === selectedId ? "selected" : ""}
            key={note.id}
            onClick={() => onSelect(note.id)}
          >
            <span>{note.title || "Untitled"}</span>
            <button className="delete-btn" onClick={e => { e.stopPropagation(); onDelete(note.id); }}>🗑️</button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
