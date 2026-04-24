import React from 'react';
import { useGame } from '../context/GameContext';
import { getSubgridBounds } from '../utils/sudoku';

export default function Cell({ row, col }) {
  const { 
    puzzle, initialPuzzle, selectedCell, errors, hintCell, selectCell, isComplete
  } = useGame();

  const size = puzzle.length;
  const value = puzzle[row][col];
  const isInitial = initialPuzzle[row][col] !== 0;

  const isSelected = selectedCell?.row === row && selectedCell?.col === col;
  const isError = errors.has(`${row},${col}`);
  const isHint = hintCell?.row === row && hintCell?.col === col;

  let isHighlighted = false;
  let isPeerNumber = false;

  if (selectedCell) {
    const sr = selectedCell.row;
    const sc = selectedCell.col;
    const sv = puzzle[sr][sc];

    if (!isSelected) {
      if (sv !== 0 && value === sv) {
        isPeerNumber = true;
      } else {
        const bounds = getSubgridBounds(sr, sc, size);
        const inSameSubgrid = row >= bounds.startRow && row <= bounds.endRow && 
                              col >= bounds.startCol && col <= bounds.endCol;
        if (row === sr || col === sc || inSameSubgrid) {
          isHighlighted = true;
        }
      }
    }
  }

  let isHintPeerValue = false;

  // Highlight related cells for naked singles (hint) if no cell is selected
  if (hintCell && !selectedCell && hintCell !== "NONE") {
     if (value !== 0 && value === hintCell.value) {
       isHintPeerValue = true;
     } else if (!isHint) {
       const hr = hintCell.row;
       const hc = hintCell.col;
       const bounds = getSubgridBounds(hr, hc, size);
       const inSameSubgrid = row >= bounds.startRow && row <= bounds.endRow && 
                             col >= bounds.startCol && col <= bounds.endCol;
       if (row === hr || col === hc || inSameSubgrid) {
         isHighlighted = true;
       }
     }
  }

  // Determine bg color
  let bgClass = "bg-transparent";
  let textClass = isInitial ? "text-gray-400 italic" : "text-white";

  if (isSelected) {
    bgClass = "bg-white";
    textClass = "text-black";
  } else if (isHint) {
    bgClass = "bg-yellow-400";
    textClass = "text-black";
  } else if (isPeerNumber || isHintPeerValue) {
    bgClass = "bg-[#1a3a5c]";
  } else if (isHighlighted) {
    bgClass = "bg-[#2a2a2a]";
  } else if (!isInitial && !isComplete && !isHint) {
    bgClass = "hover:bg-gray-800 transition-colors";
  }

  // Borders
  let borderClass = 'border border-white';
  
  if (isError) {
    borderClass = 'border-[2px] border-red-500 z-10';
  } else if (isHint) {
    borderClass = 'border-[2px] border-yellow-400 z-10';
  } else {
    // subgrid grouping
    const isThickRight = size === 9 ? (col === 2 || col === 5) : (col === 2);
    const isThickBottom = size === 6 ? (row === 1 || row === 3) : (row === 2 || row === 5);
    
    if (isThickRight && isThickBottom) {
      borderClass = 'border border-gray-600 border-r-white border-b-white border-r-[3px] border-b-[3px]';
    } else if (isThickRight) {
      borderClass = 'border border-gray-600 border-r-white border-r-[3px]';
    } else if (isThickBottom) {
      borderClass = 'border border-gray-600 border-b-white border-b-[3px]';
    } else {
      borderClass = 'border border-gray-600';
    }
  }

  return (
    <div 
      className={`flex items-center justify-center cursor-pointer select-none text-xl sm:text-2xl font-semibold w-full h-full ${bgClass} ${textClass} ${borderClass}`}
      onClick={() => selectCell(row, col)}
      style={{ aspectRatio: '1/1' }}
    >
      {value !== 0 ? value : ''}
    </div>
  );
}
