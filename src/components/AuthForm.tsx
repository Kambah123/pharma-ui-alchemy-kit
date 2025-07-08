import React, { useState } from 'react';
import { useAuth } from '../hooks/use-auth';

export default function AuthForm() {
  const { user, loading, error, signUp, signIn, signOut } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    if (mode === 'login') {
      const ok = await signIn(email, password);
      if (ok) setMessage('Logged in!');
    } else {
      const ok = await signUp(email, password);
      if (ok) setMessage('Check your email for confirmation!');
    }
  };

  if (user) {
    return (
      <div className="p-4 border rounded max-w-sm mx-auto mt-8">
        <p className="mb-2">Logged in as <b>{user.email}</b></p>
        <button onClick={signOut} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded max-w-sm mx-auto mt-8 flex flex-col gap-2">
      <h2 className="text-lg font-bold mb-2">{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="border px-2 py-1 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className="border px-2 py-1 rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? 'Loading...' : mode === 'login' ? 'Login' : 'Sign Up'}
      </button>
      <button type="button" className="text-blue-600 underline text-sm" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
        {mode === 'login' ? 'Need an account? Sign Up' : 'Already have an account? Login'}
      </button>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      {message && <div className="text-green-600 text-sm">{message}</div>}
    </form>
  );
} 