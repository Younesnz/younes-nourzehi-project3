# Sudoku React

A minimal, tailwind-styled single-player Sudoku application built to strictly demonstrate core React principles: unidirectional data flow, Context API for state management, component composition, and `localStorage` persistence.(no Redux, Zustand, etc).

## How to Run

1. Open the project root directory in your terminal.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open the displayed local address (usually `http://localhost:5173`) in your browser to play!

## Project Structure & Pages

The application is built with a combination of functioning game-logic components and beautiful UI mockups showcasing responsive layout abilities.

### Fully Functional Pages
- **Home (`/`)**: High-contrast landing page with standard routing.
- **Game Page (`/games/:difficulty`)**: The complete interactive Sudoku engine! 
  - Loads JSON puzzle datasets (supports entirely different layouts like Easy 6x6 or Normal 9x9 modes).
  - Relies completely on native Context API and dynamically handles `localStorage` synchronization (game board, difficulty, and timer automatically persist across full page refreshes).
  - Comprehensive error validation highlights conflicting peer numbers, rows, columns, and custom subgrids.
  - Interactive smart-hint mechanism mapping naked-singles cleanly onto the active board and NumberPad.
- **Rules (`/rules`)**: Explanation view mapped with React state to protect personal email data from scraping bots.

### Mock UI Pages 
*These pages are heavily styled to match the dark minimalism design system but are intentionally isolated mock interfaces with no backend integrations.*
- **Game Selection (`/games`)**: A fully responsive grid of structured game cards displaying dynamic properties, icons, and avatars. (hard coded)
- **High Scores (`/scores`)**: A static but interactive dashboard showcasing dynamic tab filtering logic, beautifully displaying a hardcoded leaderboard containing various names and real circular profile avatars.
- **Login (`/login`)**: Complete UI shell for a standard credential authentication screen.
- **Register (`/register`)**: Beautifully boxed password confirmation and sign-up form.
