import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      
      login(data);
      navigate('/games');
    } catch (err) {
      setError(err.message);
    }
  };

  const isFormValid = username.trim() !== '' && password.trim() !== '';

  return (
    <div className="max-w-md mx-auto mt-12 bg-surface p-8 border border-gray-700 rounded-md">
      <h2 className="text-3xl font-bold uppercase mb-6 text-white text-center">Login</h2>
      {error && <div className="bg-red-500/20 text-red-500 border border-red-500 rounded p-2 mb-4 text-sm text-center">{error}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-400 uppercase">Username</label>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-black border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:border-accent" 
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-400 uppercase">Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-black border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:border-accent" 
          />
        </div>
        <button 
          type="submit" 
          disabled={!isFormValid}
          className="bg-accent hover:bg-accent-hover text-white font-bold uppercase rounded-md py-3 mt-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sign In
        </button>
      </form>
      <div className="mt-6 text-center text-sm text-gray-400">
        Don't have an account? <Link to="/register" className="text-accent hover:text-accent-hover font-bold">Register here</Link>
      </div>
    </div>
  );
}
