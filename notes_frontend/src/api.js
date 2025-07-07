const BACKEND_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

// Utility for making API requests to FastAPI backend for notes CRUD.
async function request(path, opts = {}) {
  const token = localStorage.getItem("sb-access-token");
  const headers = { ...opts.headers, "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${BACKEND_URL}${path}`, { ...opts, headers });
  let body = null;
  try {
    body = await res.json();
  } catch { /* fallthrough */ }
  if (!res.ok) throw new Error(body?.detail || res.statusText);
  return body;
}

// PUBLIC_INTERFACE
export async function fetchNotes() {
  return await request("/notes", { method: "GET" });
}

// PUBLIC_INTERFACE
export async function createNote(note) {
  return await request("/notes", {
    method: "POST",
    body: JSON.stringify(note)
  });
}

// PUBLIC_INTERFACE
export async function updateNote(id, note) {
  return await request(`/notes/${id}`, {
    method: "PUT",
    body: JSON.stringify(note)
  });
}

// PUBLIC_INTERFACE
export async function deleteNote(id) {
  return await request(`/notes/${id}`, { method: "DELETE" });
}
