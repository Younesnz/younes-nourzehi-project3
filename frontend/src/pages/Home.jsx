import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="font-sans font-black text-6xl md:text-8xl tracking-widest uppercase mb-4 text-white">
        SUDOKU
      </h1>
      <p className="text-xl text-gray-400 mb-12">
        A minimal Sudoku experience.
      </p>
      <div className="flex flex-col sm:flex-row gap-6">
        <Link
          to="/games"
          className="bg-surface hover:bg-gray-800 border border-white px-8 py-3 rounded-md font-semibold uppercase tracking-wider text-lg transition-colors text-white"
        >
          Play
        </Link>
        <Link
          to="/rules"
          className="bg-accent hover:bg-accent-hover text-white px-8 py-3 rounded-md font-semibold uppercase tracking-wider text-lg transition-colors"
        >
          Rules
        </Link>
      </div>
    </div>
  );
}
