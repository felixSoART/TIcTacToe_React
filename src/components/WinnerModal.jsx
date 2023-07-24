
import { Square } from "./square"
import confetti from "canvas-confetti";
import React, { useRef, useState } from 'react';


export function WinnerModal ({winner, resetGame}) {
    
    if (winner === null) {
        return null
    }

    const winnerText = winner === false ? 'Empate' : 'El ganador es:'

    if(winner){
        confetti({
          origin: {
            x: 0.65
          }
        })
    }

    const seccionWinner = useRef(null)

    const closeWinnerModal = () => {

      seccionWinner.current.style.display = 'none'
    };
      
    return  (
              <section className="winner detalleCapaWinner" ref={seccionWinner} >
                <div className="text">
                <div onClick={closeWinnerModal} className="cerrarWinnerModal">X</div>
                  <h2>
                    {winnerText}
                  </h2>
                  
                  <header className="win">
                    {winner  ? <Square>{winner}</Square> : <Square> = </Square>}
                  </header>
                  <footer >  
                    <button className="winnerResetGame"  onClick={resetGame} >Empezar de nuevo</button>
                  </footer>
                </div>
              </section>
          
    )
}