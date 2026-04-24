import express from 'express';
import Score from '../models/Score.js';
import User from '../models/User.js';
import Game from '../models/Game.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// GET /api/highscore
// Returns list of all the users in the system and the number of games that they’ve won.
// Ordered from most wins to least, ties based on username. Any user with 0 wins should not be shown.
router.get('/', async (req, res) => {
  try {
    const scores = await Score.aggregate([
      {
        $group: {
          _id: '$user',
          wins: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      {
        $unwind: '$userDetails'
      },
      {
        $project: {
          _id: 0,
          username: '$userDetails.username',
          profileImage: '$userDetails.profileImage',
          wins: 1
        }
      },
      {
        $sort: { wins: -1, username: 1 }
      }
    ]);

    res.json(scores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/highscore
// Update the high score for a specific game (record a win for a user)
router.post('/', requireAuth, async (req, res) => {
  try {
    const { gameId, time } = req.body;
    if (!gameId) {
      return res.status(400).json({ message: 'gameId is required' });
    }

    // Check if score already exists for this user and game
    const existingScore = await Score.findOne({ user: req.user._id, game: gameId });
    if (existingScore) {
      // If we want to update time, we could, but let's just keep the first win or update if faster.
      if (time && time < existingScore.time) {
        existingScore.time = time;
        await existingScore.save();
      }
      return res.json(existingScore);
    }

    const newScore = new Score({
      user: req.user._id,
      game: gameId,
      time: time || 0
    });

    await newScore.save();
    res.status(201).json(newScore);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/highscore/:gameId
// Return high score for specific game
router.get('/:gameId', async (req, res) => {
  try {
    const scores = await Score.find({ game: req.params.gameId })
      .populate('user', 'username profileImage')
      .sort({ time: 1 }); // Lowest time first
    
    res.json(scores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
