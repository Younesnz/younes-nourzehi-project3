import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RiUserSmileLine, RiSkull2Line } from '@remixicon/react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const navLinks = (
    <>
      <Link to="/" className={`transition-colors duration-150 ${isActive('/') ? 'text-accent font-bold' : 'text-gray-400 hover:text-white'}`}>Home</Link>
      <Link to="/games" className={`transition-colors duration-150 ${isActive('/games') ? 'text-accent font-bold' : 'text-gray-400 hover:text-white'}`}>Selection</Link>
      <Link to="/rules" className={`transition-colors duration-150 ${isActive('/rules') ? 'text-accent font-bold' : 'text-gray-400 hover:text-white'}`}>Rules</Link>
      <Link to="/scores" className={`transition-colors duration-150 ${isActive('/scores') ? 'text-accent font-bold' : 'text-gray-400 hover:text-white'}`}>High Score</Link>
    </>
  );

  const authSection = !user ? (
    <div className="flex items-center gap-1">
      <Link to="/login" className="bg-accent hover:bg-accent-hover px-2 py-2 rounded-md font-semibold uppercase text-xs transition-colors duration-150">Login</Link>
      <Link to="/register" className="bg-accent hover:bg-accent-hover px-2 py-2 rounded-md font-semibold uppercase text-xs transition-colors duration-150">Register</Link>
    </div>
  ) : (
    <div className="flex items-center gap-4">
      <img src={`/profiles/${user.profileImage}`} alt={user.username} className="w-8 h-8 rounded-full border border-white object-cover" />
      <span className="font-semibold text-sm">{user.username}</span>
      <button onClick={logout} className="text-xs hover:text-gray-300 uppercase transition-colors duration-150">Logout</button>
    </div>
  );

  return (
    <nav className="bg-surface border-b border-white relative z-50 pt-1 sm:pt-2">
      <div className="max-w-[896px] mx-auto px-4 sm:px-8 py-4 sm:py-0 sm:h-[64px] flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 sm:justify-between">
        <div className="flex items-center shrink-0 self-start sm:self-auto">
          <Link to="/">
            <h1 className="font-sans font-black text-2xl tracking-widest uppercase text-white">SUDOKU</h1>
          </Link>
        </div>

        {/* Nav Links */}
        <div className="grid grid-cols-2 justify-items-center gap-y-3 gap-x-4 sm:flex sm:items-center sm:gap-4 text-xs font-semibold uppercase sm:justify-center flex-1 sm:mx-4 w-full sm:w-auto">
          {navLinks}
        </div>

        {/* Auth / Profile */}
        <div className="flex items-center justify-center shrink-0 w-full sm:w-auto border-t border-gray-700 pt-3 sm:border-0 sm:pt-0">
          {authSection}
        </div>
      </div>
    </nav>
  );
}
