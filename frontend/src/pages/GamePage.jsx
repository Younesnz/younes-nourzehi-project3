import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { useAuth } from '../context/AuthContext';
import Board from '../components/Board';
import NumberPad from '../components/NumberPad';
import Timer from '../components/Timer';
import GameControls from '../components/GameControls';

export default function GamePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    loadGameById, isLoading, loadingError, puzzle, isComplete, difficulty, gameId
  } = useGame();
  
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    if (gameId !== id) {
      loadGameById(id);
    }
  }, [id, gameId, loadGameById]);

  useEffect(() => {
    // Fetch game details (like creator) to allow deletion
    fetch(`/api/sudoku/${id}`)
      .then(res => res.json())
      .then(data => setGameData(data))
      .catch(err => console.error(err));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this game?")) return;
    try {
      const res = await fetch(`/api/sudoku/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        navigate('/games');
      } else {
        alert("Failed to delete game");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return <div className="text-center mt-20 text-xl font-semibold text-white">Loading puzzle...</div>;
  }

  if (loadingError) {
    return (
      <div className="text-center mt-20 flex flex-col items-center gap-4">
        <div className="text-red-500 font-bold text-xl">Failed to load puzzle data.</div>
        <button 
          onClick={() => loadGameById(id)}
          className="bg-accent hover:bg-accent-hover px-6 py-2 rounded-md font-semibold text-white uppercase"
        >
          Try Again
        </button>
      </div>
    );
  }

  const isCreator = user && gameData && gameData.creator && gameData.creator._id === user._id;

  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex justify-between items-center max-w-[500px] mb-4">
        <div className="text-lg font-bold uppercase text-gray-400 flex flex-col">
          <span>{gameData ? gameData.name : ''}</span>
          <span className={difficulty === 'easy' ? 'text-green-500 text-sm' : 'text-yellow-500 text-sm'}>{difficulty}</span>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Timer />
          {isCreator && (
            <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded">
              Delete Game
            </button>
          )}
        </div>
      </div>

      <Board />
      
      {isComplete && (
        <div className="my-6 p-4 bg-green-600 text-white font-bold text-xl rounded-md animate-pulse">
          Congratulations! You completed the puzzle!
        </div>
      )}

      <NumberPad />
      <GameControls />
    </div>
  );
}
