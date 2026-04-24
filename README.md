# Sudoku MERN Application

This project is a full-stack MERN (MongoDB, Express, React, Node.js) Sudoku application built as a final project.

- Student: **Younes Nourzehi**
- Github Repo: **https://github.com/Younesnz/younes-nourzehi-project3**
- Walkthrough Video: **https://go.screenpal.com/watch/cOfZebnOasK**
- Link to Deployed app: **https://sudoku-younes.onrender.com/**

## Writeup

### Challenges Faced

One of the primary challenges was migrating the state management from a purely client-side React application reading local JSON files to a full-stack architecture where puzzles are generated, stored, and managed on the backend. Ensuring that the timer and puzzle state correctly synced without excessive API calls required careful management of `localStorage` combined with API updates upon puzzle completion. Another challenge was implementing a seamless image selection process for user profiles and games while maintaining a good UI.

### Given more time, what additional features, functional or design changes would you make?

Given more time, I would implement:

1. **Real-time Multiplayer:** Allow users to compete against each other to solve the same Sudoku puzzle in real-time using WebSockets.
2. **JWT Refresh Tokens:** Enhance security by using short-lived access tokens and longer-lived refresh tokens.
3. **Leaderboard Filtering:** Add filtering options to the High Score page to show scores per difficulty or specific game or high scores by time.

### Assumptions Made

- Users will play the game online while connected to the internet. While state is saved to `localStorage` to prevent loss on refresh, the backend API is required to save completed scores and fetch new games.
- I added functionality to choose a profile image from a list of images and same for game images.
- The definition of a "high score" is the total number of unique puzzles a user has completed and not the time.
- **WARNING:** as I published my project on render.com and I'm using the free tier, sometimes it doesn't load the frontend or backend correctly, so if you are trying to see the highscores, login or register and it looks not right or loading forever, there is no problem with code and it's because of free tier of render.com. just please wait 30 seconds and try again from home page. it should work!

### Time Taken

This assignment took approximately **15 hours** to complete, broken down into:

- Backend Setup & Database Schema: ~3 hours
- RESTful API implementation: ~4 hours
- Frontend Integration & Context Updates: ~5 hours
- Styling and UI Polish: ~3 hour

### Bonus Points Accomplished

1. **Password Encryption (2pts):** User passwords are encrypted using `bcrypt` in the backend before being stored in the MongoDB database. See `backend/routes/user.js`.
2. **Delete Game (5pts):** Users who create a game can delete it from the Game Page. Deleting a game also removes all associated high scores for that game. See `backend/routes/sudoku.js` (`DELETE /api/sudoku/:id`).
