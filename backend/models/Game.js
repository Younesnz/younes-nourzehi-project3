import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  difficulty: {
    type: String,
    enum: ['easy', 'normal'],
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  puzzle: {
    type: [[Number]],
    required: true,
  },
  initialPuzzle: {
    type: [[Number]],
    required: true,
  },
  gameImage: {
    type: String,
    default: 'game01.jpg',
  }
}, { timestamps: true });

export default mongoose.model('Game', gameSchema);
