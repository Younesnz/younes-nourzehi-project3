import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getRandomPuzzle = (difficulty) => {
  try {
    const dir = path.join(__dirname, '..', 'data', difficulty);
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
    if (files.length === 0) {
      throw new Error(`No puzzles found for difficulty ${difficulty}`);
    }
    const randomFile = files[Math.floor(Math.random() * files.length)];
    const filePath = path.join(dir, randomFile);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    return data.puzzle;
  } catch (error) {
    console.error(`Error loading puzzle for ${difficulty}:`, error);
    throw error;
  }
};
