import React, { useState, useEffect } from "react";
import "./App.css";

const generateShuffledBoard = (size) => {
  let numbers = [...Array(size * size).keys()];
  numbers.sort(() => Math.random() - 0.5); // Shuffle
  return numbers;
};

const App = () => {
  const [size, setSize] = useState(3); // Default 3x3
  const [board, setBoard] = useState(generateShuffledBoard(size));
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => setTime((prev) => prev + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [isRunning]);

  useEffect(() => {
    setBoard(generateShuffledBoard(size));
    setMoves(0);
    setTime(0);
    setIsRunning(false);
  }, [size]);

  const isSolved = board.every((num, idx) => num === idx);

  const handleTileClick = (index) => {
    const emptyIndex = board.indexOf(0);
    const validMoves = [
      emptyIndex - 1,
      emptyIndex + 1,
      emptyIndex - size,
      emptyIndex + size,
    ];
    
    if (validMoves.includes(index)) {
      let newBoard = [...board];
      [newBoard[index], newBoard[emptyIndex]] = [newBoard[emptyIndex], newBoard[index]];
      setBoard(newBoard);
      setMoves(moves + 1);
      if (!isRunning) setIsRunning(true);
    }
  };

  return (
    <div className="container">
      <h1>🧩 Sliding Puzzle Game</h1>
      <div className="controls">
        <label>Grid Size:</label>
        <select onChange={(e) => setSize(Number(e.target.value))} value={size}>
          <option value={3}>3x3</option>
          <option value={4}>4x4</option>
          <option value={5}>5x5</option>
        </select>
        <button onClick={() => setBoard(generateShuffledBoard(size))}>Shuffle</button>
      </div>
      
      <div className="stats">
        <p>Moves: {moves} | Time: {time}s</p>
      </div>

      <div className="board" style={{ gridTemplateColumns: `repeat(${size}, 80px)` }}>
        {board.map((num, idx) => (
          <div
            key={idx}
            className={`tile ${num === 0 ? "empty" : ""}`}
            onClick={() => handleTileClick(idx)}
          >
            {num !== 0 && num}
          </div>
        ))}
      </div>

      {isSolved && <h2 className="win-message">🎉 You Win! 🎉</h2>}
    </div>
  );
};

export default App;
