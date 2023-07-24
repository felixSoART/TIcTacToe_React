import { useState } from "react";

import "./App.css";
import confetti from "canvas-confetti";

import { Square } from "./components/square";
import { TURNS, WINNER_COMBOS } from "./constants.js"
import { checkWinner } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal.jsx";
import { checkGameOver } from "./logic/board";
import { useEffect } from "react";
import { saveGameStorage, resetGameStorage } from "./logic/storage";
import { FollowMouse} from "./components/FollowMouse"
import { TitleComponent } from "./components/TitleComponent";
import { TableComoponent } from "./components/TableComponent";





function App() {
// Crrea el tablero, comprobando si existe un tablero de una partida anterior y si no encuentra este, crea uno vacio
  const [board, setBoard] =  useState( () => {
    const boardFromStorage = window.localStorage.getItem('board')
    
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  
  }); 


// Crea el estado del turno, comprobando antes si existe el turno de una partida anterior y si no, devuelve el turno inicial TURNS.X
  const [turn, setTurn] = useState( () => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ? JSON.parse(turnFromStorage) : TURNS.X
  })

//Null no ganador, false empate, true ganador
  const [winner, setWinner] = useState(null)  

// Reinicia la partida
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()
   }

// ACTUALIZA EL TABLERO, SETTEA EL NUEVO TURNO Y CHEKEA EL ESTADO DE LA PARTIDA PARA ACABARLA CON UN GANADOR O EMPATE
  const updateBoard = (index) => {
    // Si el square a actualizar esta ocupado sale de la funcion 
    if(board[index] != null || winner) return

    // Crea un nuevo tablero a partir del que tenemos en ese momento y le inyecta en la posicion indicada con "index" el valor actual del estado turn  
    const newBoard = [... board]
        newBoard[index] = turn
        
        // Cambia el tablero viejo con el actual
        setBoard(newBoard)
    // Cambia el turno actual ya que ya se ha realizado el turno y la  actualizacion del tablero
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
        setTurn(newTurn)
    // Guarda la partida en local storage pasandole a la funcion un objeto board y turn
    saveGameStorage({
      board: newBoard,
      turn: newTurn
    })

    // Comprueba si hay un ganador en el board post-movimiento
    const newWinner = checkWinner(newBoard)
    

    // Comprueba si el tablero ha sido completado por completo para acabar con empate
    const finalJuego = checkGameOver(newBoard);
    // Si existe un ganador o la partida ha finalizado lo settea  
    if(newWinner){
      // lanza confeti:  node package confetti
     // confetti()
       setWinner(newWinner)
    }else if (finalJuego){
      setWinner(false)
    }
   
  }


  return (
    <>
    
    <TitleComponent />
    <div >
     <FollowMouse turn={turn}  /> 
      
      <main className="board" >
       
        <button onClick={resetGame}>Empezar de nuevo</button>
    <TableComoponent board={board} updateBoard={updateBoard}></TableComoponent>

        <section className="turn">
          <Square isSelected={turn === TURNS.X}>
            {TURNS.X}
          </Square>
          <Square isSelected={turn === TURNS.O}>
            {TURNS.O} 
          </Square>
        </section> 
          
        {/* Tarjeta que muestra el ganador de la partida y pasa la funcion de resetear la partida para asignar la funcion al boton "empezar de nuevo" */}
           <WinnerModal resetGame={resetGame} winner={winner} />
            {/* <CursorChanger  turn={turn}/> */}
      </main>

      </div>
    </>
  );
}

export default App;

