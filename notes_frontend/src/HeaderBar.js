import React from "react";
import { useAuth } from "./AuthContext";

// PUBLIC_INTERFACE
// HeaderBar displays the app title, theme toggle, and user/logout button.
export default function HeaderBar({ theme, onToggleTheme }) {
  const { user, signOut } = useAuth();

  return (
    <header className="header-bar">
      <div className="app-title">NoteMaster 📝</div>
      <div className="user-box">
        {user && (
          <>
            <span>{user.email}</span>
            <button className="logout-btn" onClick={signOut}>Logout</button>
          </>
        )}
        <button 
          className="theme-toggle"
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          onClick={onToggleTheme}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>
    </header>
  );
}
