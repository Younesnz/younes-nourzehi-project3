import React from 'react';
import { useGame } from '../context/GameContext';
import Cell from './Cell';

export default function Board() {
  const { puzzle } = useGame();
  
  if (!puzzle || puzzle.length === 0) return null;
  
  const size = puzzle.length;
  const gridColsClass = size === 9 ? 'grid-cols-9' : 'grid-cols-6';
  
  return (
    <div className={`grid ${gridColsClass} border-[3px] border-white w-full max-w-[500px] mx-auto bg-black`}>
      {puzzle.map((rowArr, rowIndex) => (
        rowArr.map((_, colIndex) => (
          <Cell key={`${rowIndex}-${colIndex}`} row={rowIndex} col={colIndex} />
        ))
      ))}
    </div>
  );
}
