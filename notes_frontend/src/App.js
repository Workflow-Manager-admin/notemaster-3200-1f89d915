import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { AuthProvider, useAuth } from './AuthContext';
import AuthForm from './AuthForm';
import Sidebar from './Sidebar';
import NoteEditor from './NoteEditor';
import HeaderBar from './HeaderBar';
import { fetchNotes, createNote, updateNote, deleteNote } from './api';

// PUBLIC_INTERFACE
// The main App component for the Notes App (wiring auth/pages/layout).
function MainApp() {
  const { user, loading } = useAuth();
  const [theme, setTheme] = useState('light');
  const [notes, setNotes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [saving, setSaving] = useState(false);

  // Theme effect
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  const toggleTheme = () => setTheme(prev => prev === "light" ? "dark" : "light");

  // Fetch notes after login
  const loadNotes = useCallback(() => {
    if (!user) return;
    fetchNotes()
      .then(data => {
        setNotes(Array.isArray(data) ? data : []);
        // auto-select first note
        if (Array.isArray(data) && data.length > 0)
          setSelectedId(data[0].id);
        else setSelectedId(null);
      })
      .catch(() => setNotes([]));
  }, [user]);

  useEffect(() => { loadNotes(); }, [loadNotes]);

  // Add note
  async function handleCreateNote() {
    setSaving(true);
    try {
      const empty = { title: '', content: '' };
      const res = await createNote(empty);
      setNotes([res, ...notes]);
      setSelectedId(res.id);
    } finally { setSaving(false); }
  }
  // Edit note
  async function handleSaveNote(updated) {
    if (!selectedId) return;
    setSaving(true);
    try {
      const res = await updateNote(selectedId, updated);
      setNotes(notes.map(n => n.id === selectedId ? res : n));
    } finally { setSaving(false); }
  }
  // Select note
  function handleSelectNote(id) { setSelectedId(id); }
  // Delete note
  async function handleDeleteNote(id) {
    setSaving(true);
    try {
      await deleteNote(id);
      const remain = notes.filter(n => n.id !== id);
      setNotes(remain);
      setSelectedId(remain.length > 0 ? remain[0].id : null);
    } finally { setSaving(false); }
  }

  if (loading) return <div className="App">Loading…</div>;

  if (!user) {
    return (
      <div className="App">
        <AuthForm />
      </div>
    );
  }
  const selectedNote = notes.find(n => n.id === selectedId);

  return (
    <div className="App">
      <HeaderBar theme={theme} onToggleTheme={toggleTheme} />
      <div className="app-layout">
        <Sidebar
          notes={notes}
          selectedId={selectedId}
          onSelect={handleSelectNote}
          onCreate={handleCreateNote}
          onDelete={handleDeleteNote}
        />
        <main className="main-content">
          <NoteEditor note={selectedNote} onSave={handleSaveNote} loading={saving} />
        </main>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
