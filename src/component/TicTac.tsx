import React, { useState } from "react";

type TypeOfBoard = "X" | "O" | null;
type WinnerType = "X" | "O" | "draw" | null;
const TicTac: React.FC = () => {
  const [board, setBoard] = useState<TypeOfBoard[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);

  const calaculateWinner = (squares: TypeOfBoard[]): WinnerType => {
    const lines: number[][] = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], //rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], //column
      [0, 4, 8],
      [2, 4, 6], //diagonls
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a] as "X" | "O";
      }
    }
    //draw
    if (squares.every((square) => square !== null)) {
      return "draw";
    }
    return null;
  };

  const handleClick = (i: number): void => {
    if (board[i] || isGameOver) {
      return;
    }
    const newBoard = [...board];
    newBoard[i] = isXNext ? "X" : "O";
    setBoard(newBoard);

    const winner = calaculateWinner(newBoard);
    if (winner) {
      setIsGameOver(true);
    } else {
      setIsXNext(!isXNext);
    }
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsGameOver(false);
    setIsXNext(true);
  };

  const getStatus = () => {
    const winner = calaculateWinner(board);
    if (winner == "X" || winner == "O") {
      return `Winner is ${winner}`;
    } else if (winner == "draw") {
      return "Game ended in a draw!.";
    } else {
      return `Next player is ${isXNext ? "X" : "O"}`;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Tic Tac Toe</h1>
      <div className="text-lg mb-4 font-medium">{getStatus()}</div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {board?.map((item, index) => (
          <button
            key={index}
            className="w-20 h-20 flex items-center justify-center text-2xl text-black font-bold bg-slate-100 hover:bg-slate-200 border border-slate-300"
            onClick={() => handleClick(index)}
          >
            {item}
          </button>
        ))}
      </div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  );
};

export default TicTac;
