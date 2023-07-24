import { WINNER_COMBOS } from "../constants"
import { TURNS } from "../constants"
import confetti from "canvas-confetti";
import { useState } from "react";

export const checkWinner = (boardToCheck) => {
    for(const combo of WINNER_COMBOS){
      const [a,b,c] = combo
      
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[b] === boardToCheck[c]
        ) 
        {
        return boardToCheck[a]
        }

    }
  }

export   const checkGameOver = (newBoard) => {

    return newBoard.every((square) => square !== null)
  }

export   const Board = () => { 
    
  const [board, setBoard] =  useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null) 

  const updateBoard = (index) => {
    if (board[index] !== null || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    const newWinner = checkWinner(newBoard);
    const finalJuego = checkGameOver(newBoard);

    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (finalJuego) {
      setWinner(false);
    }


  }}