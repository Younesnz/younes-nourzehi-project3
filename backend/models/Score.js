import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: true,
  },
  time: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

// Ensure a user can only have one score per game
scoreSchema.index({ user: 1, game: 1 }, { unique: true });

export default mongoose.model('Score', scoreSchema);
