import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiCloseLine } from '@remixicon/react';
import GameCard from '../components/GameCard';
import { useAuth } from '../context/AuthContext';

const GAME_IMAGES = Array.from({ length: 6 }, (_, i) => `game${String(i + 1).padStart(2, '0')}.jpg`);

export default function GameSelection() {
  const [games, setGames] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [gameName, setGameName] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [selectedImage, setSelectedImage] = useState(GAME_IMAGES[0]);
  const [showImageSelector, setShowImageSelector] = useState(false);
  const [error, setError] = useState('');
  
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/sudoku')
      .then(res => res.json())
      .then(data => setGames(data))
      .catch(err => console.error("Failed to fetch games", err));
  }, []);

  const handleCreateGame = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!user) {
      setError("Please login to create a game");
      return;
    }
    
    try {
      const res = await fetch('/api/sudoku', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          difficulty, 
          gameImage: selectedImage,
          customName: gameName 
        })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        navigate(`/games/${data._id}`);
      } else {
        setError(data.message || "Failed to create game");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="w-full relative">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <h2 className="text-3xl font-bold uppercase text-white">Select a Game</h2>
        {user && (
          <button 
            onClick={() => setShowModal(true)}
            className="bg-accent hover:bg-accent-hover px-6 py-3 rounded-md font-bold text-sm transition-colors text-white uppercase shadow-lg shadow-accent/20"
          >
            Create a new game
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {games.map(game => (
          <GameCard key={game._id} game={game} />
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-surface border border-gray-700 rounded-xl p-6 w-full max-w-md relative animate-fade-in shadow-2xl">
            <button 
              onClick={() => {
                setShowModal(false);
                setShowImageSelector(false);
                setGameName('');
                setError('');
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <RiCloseLine size={24} />
            </button>
            
            <h3 className="text-2xl font-bold uppercase text-white mb-6 text-center">Create Game</h3>
            
            {error && <div className="bg-red-500/20 text-red-500 border border-red-500 rounded p-2 mb-4 text-sm text-center">{error}</div>}
            
            <form onSubmit={handleCreateGame} className="flex flex-col gap-5">
              
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Game Name (Optional)</label>
                <input 
                  type="text" 
                  value={gameName}
                  onChange={(e) => setGameName(e.target.value)}
                  placeholder="Leave empty for a random name"
                  className="bg-black border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:border-accent w-full" 
                />
              </div>

              <div className="flex flex-col gap-2 items-center">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide self-start">Cover Image</label>
                <div className="w-[200px] h-[100px] rounded-lg overflow-hidden border-2 border-gray-600 mb-2 bg-black">
                  <img src={`/games/${selectedImage}`} alt="Selected Cover" className="w-full h-full object-cover" />
                </div>
                
                <button 
                  type="button"
                  onClick={() => setShowImageSelector(!showImageSelector)}
                  className="text-xs bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 rounded-full font-semibold transition-colors border border-gray-600"
                >
                  {showImageSelector ? "Hide Images" : "Select Image"}
                </button>
                
                {showImageSelector && (
                  <div className="flex gap-2 overflow-x-auto w-full p-2 mt-2 bg-black rounded-lg border border-gray-800">
                    {GAME_IMAGES.map(img => (
                      <img
                        key={img}
                        src={`/games/${img}`}
                        alt="Game option"
                        onClick={() => setSelectedImage(img)}
                        className={`w-20 h-10 object-cover rounded cursor-pointer border-2 transition-all shrink-0 ${selectedImage === img ? 'border-accent scale-105 shadow-md shadow-accent/20' : 'border-transparent opacity-60 hover:opacity-100'}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Difficulty</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setDifficulty('easy')}
                    className={`flex-1 py-2 rounded-md font-bold uppercase text-xs transition-colors border ${difficulty === 'easy' ? 'bg-accent/20 border-accent text-accent' : 'bg-black border-gray-600 text-gray-400 hover:border-gray-400'}`}
                  >
                    Easy
                  </button>
                  <button
                    type="button"
                    onClick={() => setDifficulty('normal')}
                    className={`flex-1 py-2 rounded-md font-bold uppercase text-xs transition-colors border ${difficulty === 'normal' ? 'bg-accent/20 border-accent text-accent' : 'bg-black border-gray-600 text-gray-400 hover:border-gray-400'}`}
                  >
                    Normal
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                className="bg-accent hover:bg-accent-hover text-white font-bold uppercase rounded-md py-3 mt-2 transition-colors w-full shadow-lg shadow-accent/20"
              >
                Start Game
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
