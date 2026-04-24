import React from 'react';
import { useGame } from '../context/GameContext';
import { RiLightbulbAiLine, RiRefreshLine } from '@remixicon/react';

export default function GameControls() {
  const { resetPuzzle, triggerHint, hintCell } = useGame();
  
  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      <div className="flex gap-4 sm:gap-6">
        <button 
          onClick={triggerHint}
          className="flex flex-col items-center justify-center gap-1.5 bg-accent hover:bg-accent-hover px-4 py-3 rounded-md font-semibold uppercase text-xs text-white min-w-[80px] sm:min-w-[90px] transition-colors"
        >
          <RiLightbulbAiLine size={24} />
          <span>Hint</span>
        </button>
        <button 
          onClick={resetPuzzle}
          className="flex flex-col items-center justify-center gap-1.5 bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-md font-semibold uppercase text-xs text-white min-w-[80px] sm:min-w-[90px] transition-colors"
        >
          <RiRefreshLine size={24} />
          <span>Reset</span>
        </button>
      </div>
      {hintCell === "NONE" && (
        <div className="text-yellow-400 text-sm font-semibold mt-2">
          No hints found.
        </div>
      )}
    </div>
  );
}
