import React, { useState } from 'react';

export default function Rules() {
  const [showEmail, setShowEmail] = useState(false);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold uppercase mb-4 text-white">How to Play</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-300 text-lg">
          <li>The grid is divided into cells and sub-grids.</li>
          <li>Every row, column, and sub-grid must contain the numbers exactly once.</li>
          <li>Easy mode uses a 6x6 grid with numbers 1-6.</li>
          <li>Normal mode uses a 9x9 grid with numbers 1-9.</li>
          <li>Pre-filled numbers cannot be changed.</li>
          <li>Click a cell, then click a number or use the eraser to clear it.</li>
          <li>Conflict highlights will show in red if a rule is violated.</li>
        </ul>
      </div>

      <div className="pt-8 border-t border-gray-700">
        <h2 className="text-2xl font-bold uppercase mb-4 text-white">Credits</h2>
        <div className="flex flex-col gap-2 text-gray-300 text-lg">
          <p><strong>Developed by:</strong> Younes Nourzehi</p>
          <div className="flex items-center gap-2">
            <strong>Email:</strong>
            {showEmail ? (
              <a href={`mailto:nourzehi.y${'@'}northeastern.edu`} className="text-accent hover:underline">
                {`nourzehi.y${'@'}northeastern.edu`}
              </a>
            ) : (
              <button 
                onClick={() => setShowEmail(true)} 
                className="bg-gray-800 hover:bg-gray-700 text-xs px-2 py-1 rounded transition-colors"
              >
                Click to reveal
              </button>
            )}
          </div>
          <div className="flex gap-4 mt-2">
            <a href="https://github.com/Younesnz/sudoku-react" className="text-accent hover:text-accent-hover transition-colors font-bold uppercase">GitHub</a>
            <a href="https://www.linkedin.com/in/younesnz/" className="text-accent hover:text-accent-hover transition-colors font-bold uppercase">LinkedIn</a>
          </div>
        </div>
      </div>
    </div>
  );
}
