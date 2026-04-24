import React from 'react';
import { useGame } from '../context/GameContext';
import { RiDeleteBack2Line } from '@remixicon/react';

export default function NumberPad() {
  const { puzzle, selectedCell, setCellValue, initialPuzzle, hintCell } = useGame();

  if (!puzzle || puzzle.length === 0) return null;
  const size = puzzle.length;
  const numbers = Array.from({ length: size }, (_, i) => i + 1);

  const activeCell = selectedCell || (hintCell && hintCell !== "NONE" ? hintCell : null);
  const isEditable = activeCell && initialPuzzle[activeCell.row][activeCell.col] === 0;

  return (
    <div className={`grid ${size === 9 ? 'grid-cols-5 sm:grid-cols-10' : 'grid-cols-7'} gap-2 max-w-[500px] mx-auto mt-6`}>
      {numbers.map(num => (
        <button
          key={num}
          disabled={!isEditable}
          onClick={() => setCellValue(activeCell.row, activeCell.col, num)}
          className="bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed rounded-md h-12 flex items-center justify-center font-semibold text-lg text-white"
        >
          {num}
        </button>
      ))}
      <button
        disabled={!isEditable}
        onClick={() => setCellValue(activeCell.row, activeCell.col, 0)}
        className="bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-md h-12 flex items-center justify-center text-white px-2"
        title="Erase"
      >
        <RiDeleteBack2Line size={24} />
      </button>
    </div>
  );
}
