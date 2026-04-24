import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import GameSelection from './pages/GameSelection';
import GamePage from './pages/GamePage';
import Rules from './pages/Rules';
import HighScores from './pages/HighScores';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider, useAuth } from './context/AuthContext';
import { GameProvider } from './context/GameContext';

function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="text-center mt-20 text-gray-400">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

function App() {
  return (
    <AuthProvider>
      <GameProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-black text-white font-sans flex flex-col">
            <Navbar />
            <main className="flex-1 w-full max-w-[896px] mx-auto px-4 sm:px-8 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/games" element={
                  <ProtectedRoute>
                    <GameSelection />
                  </ProtectedRoute>
                } />
                <Route path="/games/:id" element={
                  <ProtectedRoute>
                    <GamePage />
                  </ProtectedRoute>
                } />
                <Route path="/rules" element={<Rules />} />
                <Route path="/scores" element={<HighScores />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </GameProvider>
    </AuthProvider>
  );
}

export default App;
