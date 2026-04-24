import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react';
import { useAuth } from '../context/AuthContext';

// Assuming up to 20 profiles to be safe for future additions
const PROFILE_IMAGES = Array.from({ length: 16 }, (_, i) => `profile${String(i + 1).padStart(2, '0')}.jpg`);

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState(PROFILE_IMAGES[0]);
  const [startIndex, setStartIndex] = useState(0);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch('/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, profileImage })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      
      login(data);
      navigate('/games');
    } catch (err) {
      setError(err.message);
    }
  };

  const isFormValid = username.trim() !== '' && password.trim() !== '' && confirmPassword.trim() !== '';

  return (
    <div className="max-w-md mx-auto mt-12 bg-surface p-8 border border-gray-700 rounded-md">
      <h2 className="text-3xl font-bold uppercase mb-6 text-white text-center">Register</h2>
      {error && <div className="bg-red-500/20 text-red-500 border border-red-500 rounded p-2 mb-4 text-sm text-center">{error}</div>}
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-400 uppercase">Select Profile Image</label>
          <div className="flex items-center justify-between my-2 relative">
            <button 
              type="button"
              onClick={() => setStartIndex(Math.max(0, startIndex - 4))}
              disabled={startIndex === 0}
              className="text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors shrink-0 mr-2"
            >
              <RiArrowLeftSLine size={32} />
            </button>
            
            <div className="w-[300px] overflow-hidden py-3 px-1.5">
              <div 
                className="flex gap-3 transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${startIndex * 60}px)` }}
              >
                {PROFILE_IMAGES.map(img => (
                  <img 
                    key={img} 
                    src={`/profiles/${img}`} 
                    alt="Profile Option"
                    className={`w-12 h-12 shrink-0 rounded-full cursor-pointer object-cover border-2 transition-all duration-300 ${profileImage === img ? 'border-accent scale-110 shadow-lg shadow-accent/20' : 'border-transparent hover:border-gray-500 opacity-70 hover:opacity-100'}`}
                    onClick={() => setProfileImage(img)}
                  />
                ))}
              </div>
            </div>

            <button 
              type="button"
              onClick={() => setStartIndex(Math.min(PROFILE_IMAGES.length - 5, startIndex + 4))}
              disabled={startIndex >= PROFILE_IMAGES.length - 5}
              className="text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors shrink-0 ml-2"
            >
              <RiArrowRightSLine size={32} />
            </button>
          </div>
        </div>

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
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-400 uppercase">Confirm Password</label>
          <input 
            type="password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-black border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:border-accent" 
          />
        </div>
        <button 
          type="submit" 
          disabled={!isFormValid}
          className="bg-accent hover:bg-accent-hover text-white font-bold uppercase rounded-md py-3 mt-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create Account
        </button>
      </form>
      <div className="mt-6 text-center text-sm text-gray-400">
        Already have an account? <Link to="/login" className="text-accent hover:text-accent-hover font-bold">Login here</Link>
      </div>
    </div>
  );
}
