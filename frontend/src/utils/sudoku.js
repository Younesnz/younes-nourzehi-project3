export function getSubgridBounds(row, col, size) {
  const rowsInSubgrid = size === 6 ? 2 : 3;
  const colsInSubgrid = 3; 

  const startRow = Math.floor(row / rowsInSubgrid) * rowsInSubgrid;
  const startCol = Math.floor(col / colsInSubgrid) * colsInSubgrid;

  return {
    startRow,
    endRow: startRow + rowsInSubgrid - 1,
    startCol,
    endCol: startCol + colsInSubgrid - 1
  };
}

export function isConflict(board, row, col, value) {
  const size = board.length;
  if (value === 0) return false;

  // Check row
  for (let c = 0; c < size; c++) {
    if (c !== col && board[row][c] === value) return true;
  }

  // Check col
  for (let r = 0; r < size; r++) {
    if (r !== row && board[r][col] === value) return true;
  }

  // Check subgrid
  const bounds = getSubgridBounds(row, col, size);
  for (let r = bounds.startRow; r <= bounds.endRow; r++) {
    for (let c = bounds.startCol; c <= bounds.endCol; c++) {
      if ((r !== row || c !== col) && board[r][c] === value) {
        return true;
      }
    }
  }

  return false;
}

export function getErrors(board, size) {
  const errors = [];

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const val = board[r][c];
      if (val !== 0 && isConflict(board, r, c, val)) {
        errors.push({ row: r, col: c });
      }
    }
  }

  return errors;
}

export function isBoardComplete(board, size) {
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (board[r][c] === 0) return false;
    }
  }
  return getErrors(board, size).length === 0;
}

export function findHint(board, size) {
  // Find naked singles
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (board[r][c] === 0) {
        let validValues = [];
        for (let v = 1; v <= size; v++) {
          if (!isConflict(board, r, c, v)) {
            validValues.push(v);
          }
        }
        if (validValues.length === 1) {
          return { row: r, col: c, value: validValues[0] };
        }
      }
    }
  }
  return null;
}
