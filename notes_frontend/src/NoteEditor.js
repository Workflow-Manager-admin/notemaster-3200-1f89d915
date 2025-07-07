import React, { useState, useEffect } from "react";

// PUBLIC_INTERFACE
// NoteEditor displays and edits the note's title and content.
export default function NoteEditor({ note, onSave, loading }) {
  const [editNote, setEditNote] = useState(note || { title: "", content: "" });

  useEffect(() => {
    setEditNote(note || { title: "", content: "" });
  }, [note]);

  const handleChange = e => {
    setEditNote({ ...editNote, [e.target.name]: e.target.value });
  };

  function handleSave(e) {
    e.preventDefault();
    if (editNote.title.trim() || editNote.content.trim()) {
      onSave(editNote);
    }
  }

  if (!note) return (
    <div className="note-editor-empty">
      <p>Select a note or create a new note.</p>
    </div>
  );

  return (
    <form className="note-editor" onSubmit={handleSave}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={editNote.title}
        onChange={handleChange}
        autoFocus
      />
      <textarea
        name="content"
        rows={12}
        placeholder="Write your note here…"
        value={editNote.content}
        onChange={handleChange}
        style={{ resize: 'vertical' }}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
