import React, { useState, useEffect } from 'react';

export default function HighScores() {
  const [scores, setScores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/highscore')
      .then(res => res.json())
      .then(data => {
        setScores(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch highscores", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold uppercase mb-8 text-white">High Scores</h2>

      <div className="bg-surface border border-gray-700 rounded-md overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-400">Loading scores...</div>
        ) : scores.length === 0 ? (
          <div className="p-8 text-center text-gray-400">No high scores found yet. Be the first to win a game!</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-800 text-gray-300 text-sm uppercase">
              <tr>
                <th className="px-6 py-4 font-semibold w-24">Rank</th>
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold text-right">Puzzles Completed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {scores.map((score, idx) => (
                <tr key={idx} className="hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-white">#{idx + 1}</td>
                  <td className="px-6 py-4 text-gray-300 flex items-center gap-4">
                    <img src={`/profiles/${score.profileImage}`} alt={score.username} className="w-10 h-10 rounded-full border border-gray-500 object-cover" />
                    <span className="font-semibold text-white">{score.username}</span>
                  </td>
                  <td className="px-6 py-4 text-right text-accent font-semibold">{score.wins}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
