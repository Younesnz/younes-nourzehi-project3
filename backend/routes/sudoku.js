import express from 'express';
import Game from '../models/Game.js';
import Score from '../models/Score.js';
import { requireAuth } from '../middleware/auth.js';
import { generateGameName } from '../utils/words.js';
import { getRandomPuzzle } from '../utils/puzzleLoader.js';

const router = express.Router();

// GET /api/sudoku
router.get('/', async (req, res) => {
  try {
    const games = await Game.find()
      .populate('creator', 'username profileImage')
      .select('name difficulty creator createdAt gameImage')
      .sort({ createdAt: -1 });
    res.json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/sudoku/:id
router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id).populate('creator', 'username');
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/sudoku
router.post('/', requireAuth, async (req, res) => {
  try {
    const { difficulty, gameImage, customName } = req.body;
    if (!['easy', 'normal'].includes(difficulty)) {
      return res.status(400).json({ message: 'Invalid difficulty' });
    }

    let name = customName?.trim();
    if (name) {
      const existing = await Game.findOne({ name });
      if (existing) {
        return res.status(400).json({ message: 'Game name already exists. Please choose another.' });
      }
    } else {
      let isUnique = false;
      while (!isUnique) {
        name = generateGameName();
        const existing = await Game.findOne({ name });
        if (!existing) isUnique = true;
      }
    }

    const initialPuzzle = getRandomPuzzle(difficulty);
    // Deep copy for the playing board
    const puzzle = initialPuzzle.map(row => [...row]);

    const newGame = new Game({
      name,
      difficulty,
      creator: req.user._id,
      puzzle,
      initialPuzzle,
      gameImage: gameImage || 'game01.jpg'
    });

    await newGame.save();
    res.status(201).json({ _id: newGame._id, name: newGame.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/sudoku/:id
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    if (game.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this game' });
    }

    await Game.findByIdAndDelete(req.params.id);
    // Delete all scores associated with this game (bonus point)
    await Score.deleteMany({ game: req.params.id });

    res.json({ message: 'Game deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/sudoku/:id
// The assignment says "Will update the game with the given ID"
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    if (game.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this game' });
    }

    // Only allow updating name or image
    const { name, gameImage } = req.body;
    if (name) game.name = name;
    if (gameImage) game.gameImage = gameImage;

    await game.save();
    res.json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
