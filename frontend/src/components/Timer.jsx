import React from 'react';
import { useGame } from '../context/GameContext';

export default function Timer() {
  const { timer } = useGame();
  
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  
  return (
    <div className="text-xl font-bold tracking-widest text-white">
      {minutes}:{seconds.toString().padStart(2, '0')}
    </div>
  );
}
