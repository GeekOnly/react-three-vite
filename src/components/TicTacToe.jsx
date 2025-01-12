import React, { useState } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));  // 9 ช่องสำหรับเกม XO
  const [isXNext, setIsXNext] = useState(true);  // ตราบว่า X หรือ O จะไปก่อน
  const [winner, setWinner] = useState(null);  // ผู้ชนะ

  // ฟังก์ชันในการคำนวณผู้ชนะ
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;  // ห้ามเล่นที่ช่องที่ถูกเลือกแล้วหรือถ้ามีผู้ชนะ
    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";  // กำหนดว่าใครจะเล่น
    setBoard(newBoard);
    setIsXNext(!isXNext);  // สลับผู้เล่น

    const gameWinner = calculateWinner(newBoard);  // ตรวจสอบผู้ชนะ
    if (gameWinner) {
      setWinner(gameWinner);
    }
  };

  const renderSquare = (index) => {
    return (
      <button
        className="square"
        onClick={() => handleClick(index)}
        style={{
          width: "60px",
          height: "60px",
          backgroundColor: "#fff",
          fontSize: "2rem",
          margin: "5px",
          cursor: "pointer",
        }}
      >
        {board[index]}
      </button>
    );
  };

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ display: "flex" }}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div style={{ display: "flex" }}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div style={{ display: "flex" }}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
        {winner && <h2>Winner: {winner}</h2>}
        {!winner && board.every((square) => square !== null) && <h2>It's a draw!</h2>}
      </div>
      <button
        onClick={() => {
          setBoard(Array(9).fill(null));
          setWinner(null);
          setIsXNext(true);
        }}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Restart Game
      </button>
    </div>
  );
};

export default TicTacToe;
