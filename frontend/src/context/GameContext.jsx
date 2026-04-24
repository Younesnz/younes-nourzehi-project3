import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { getErrors, findHint, isBoardComplete } from '../utils/sudoku';
import { useAuth } from './AuthContext';

const GameContext = createContext();

export function useGame() {
  return useContext(GameContext);
}

const getInitialSavedState = () => {
  try {
    const saved = localStorage.getItem('sudoku_state');
    if (saved) return JSON.parse(saved);
  } catch {}
  return null;
};

export function GameProvider({ children }) {
  const [savedState] = useState(getInitialSavedState);

  const [puzzle, setPuzzle] = useState(savedState?.puzzle || []);
  const [initialPuzzle, setInitialPuzzle] = useState(savedState?.initialPuzzle || []);
  const [difficulty, setDifficulty] = useState(savedState?.difficulty || '');
  const [selectedCell, setSelectedCell] = useState(null);
  const [errors, setErrors] = useState(() => {
    if (savedState?.puzzle) {
      const errs = getErrors(savedState.puzzle, savedState.puzzle.length);
      return new Set(errs.map(e => `${e.row},${e.col}`));
    }
    return new Set();
  });
  const [isComplete, setIsComplete] = useState(false);
  const [timer, setTimer] = useState(savedState?.timer || 0);
  const [hintCell, setHintCell] = useState(null);
  const [gameId, setGameId] = useState(savedState?.gameId || null);

  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  
  const timerRef = useRef(null);
  const { user } = useAuth();

  const loadGameById = async (id) => {
    setIsLoading(true);
    setLoadingError(false);
    try {
      // Check if we already have this game state in local storage
      if (savedState?.gameId === id) {
        setIsLoading(false);
        return; // We use the initial state
      }

      const res = await fetch(`/api/sudoku/${id}`);
      if (!res.ok) throw new Error("Game not found");
      const data = await res.json();
      
      setDifficulty(data.difficulty);
      setGameId(data._id);
      
      const boardCopy = data.puzzle.map(row => [...row]);
      const initCopy = data.initialPuzzle.map(row => [...row]);
      
      setPuzzle(boardCopy);
      setInitialPuzzle(initCopy);
      setErrors(new Set());
      setIsComplete(false);
      setTimer(0);
      setHintCell(null);
      setSelectedCell(null);
      
      saveToStorage(boardCopy, initCopy, data.difficulty, 0, data._id);
      
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setLoadingError(true);
      setIsLoading(false);
    }
  };

  const saveToStorage = (puz, initPuz, diff, t, id) => {
    localStorage.setItem('sudoku_state', JSON.stringify({
      puzzle: puz,
      initialPuzzle: initPuz,
      difficulty: diff,
      timer: t,
      gameId: id
    }));
  };

  const clearStorage = () => {
    localStorage.removeItem('sudoku_state');
  };

  useEffect(() => {
    if (puzzle.length > 0 && !isComplete && !isLoading && !loadingError) {
      timerRef.current = setInterval(() => {
        setTimer(prev => {
          const newT = prev + 1;
          saveToStorage(puzzle, initialPuzzle, difficulty, newT, gameId);
          return newT;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [puzzle, isComplete, isLoading, loadingError, initialPuzzle, difficulty, gameId]);

  const submitScore = async (time) => {
    if (!user) return; // Ignore if not logged in
    try {
      await fetch('/api/highscore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameId, time })
      });
    } catch (error) {
      console.error('Failed to submit score:', error);
    }
  };

  const setCellValue = useCallback((row, col, value) => {
    if (isComplete) return;
    if (initialPuzzle[row][col] !== 0) return;

    setPuzzle(prev => {
      const newPuzzle = prev.map(r => [...r]);
      newPuzzle[row][col] = value === 0 ? 0 : value;

      const size = newPuzzle.length;
      const errList = getErrors(newPuzzle, size);
      const newErrors = new Set(errList.map(e => `${e.row},${e.col}`));
      setErrors(newErrors);

      const complete = isBoardComplete(newPuzzle, size);
      if (complete) {
        setIsComplete(true);
        clearStorage();
        submitScore(timer);
      } else {
        saveToStorage(newPuzzle, initialPuzzle, difficulty, timer, gameId);
      }
      
      return newPuzzle;
    });

    setSelectedCell({ row, col });
    setHintCell(null);
  }, [isComplete, initialPuzzle, difficulty, timer, gameId, user]);

  const selectCell = useCallback((row, col) => {
    if (isComplete) return;
    setSelectedCell({ row, col });
    setHintCell(null);
  }, [isComplete]);

  const resetPuzzle = useCallback(() => {
    setPuzzle(initialPuzzle.map(r => [...r]));
    setErrors(new Set());
    setHintCell(null);
    setSelectedCell(null);
    saveToStorage(initialPuzzle.map(r => [...r]), initialPuzzle, difficulty, timer, gameId);
  }, [initialPuzzle, difficulty, timer, gameId]);

  const triggerHint = useCallback(() => {
    if (isComplete || puzzle.length === 0) return;
    const size = puzzle.length;
    const hint = findHint(puzzle, size);
    if (hint) {
      setHintCell(hint);
      setSelectedCell(null);
    } else {
      setHintCell("NONE");
    }
  }, [isComplete, puzzle]);

  return (
    <GameContext.Provider value={{
      puzzle, initialPuzzle, difficulty, selectedCell, errors, isComplete, timer, hintCell, gameId,
      setCellValue, selectCell, resetPuzzle, triggerHint,
      isLoading, loadingError, loadGameById
    }}>
      {children}
    </GameContext.Provider>
  );
}
