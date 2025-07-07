import React, { useState } from 'react';
import { useAuth } from './AuthContext';

// PUBLIC_INTERFACE
// AuthForm displays tabbed login/signup forms and manages Supabase authentication.

export default function AuthForm() {
  const { signIn, signUp, loading } = useAuth();
  const [variant, setVariant] = useState('login'); // 'login' or 'signup'
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      if (variant === 'login') {
        await signIn(form.email, form.password);
      } else {
        await signUp(form.email, form.password);
      }
    } catch (err) {
      setError(err.message || 'Authentication error');
    }
  }

  return (
    <div className="auth-form">
      <div className="auth-tabs">
        <button className={variant === 'login' ? 'active' : ''} onClick={() => setVariant('login')}>
          Login
        </button>
        <button className={variant === 'signup' ? 'active' : ''} onClick={() => setVariant('signup')}>
          Sign Up
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input 
          type="email"
          name="email"
          autoComplete="username"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input 
          type="password"
          name="password"
          autoComplete={variant === 'login' ? "current-password" : "new-password"}
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : variant === 'login' ? 'Login' : 'Sign Up'}
        </button>
        {error && <div className="auth-error">{error}</div>}
      </form>
    </div>
  );
}
