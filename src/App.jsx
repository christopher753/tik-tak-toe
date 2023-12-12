import React, { useState } from 'react'
import { Square } from './components/Square'
import { Turn } from './components/Turn'
import { TURNS } from './constants'
import { checkEndGame, checkWinner } from './logic/board'
import confetti from 'canvas-confetti'

function App () {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    if (turnFromStorage) return JSON.parse(turnFromStorage)
    return TURNS.X
  })
  const [winner, setWinner] = useState(null)

  const updateSquare = (index) => {
    // Validamos si ese Square ya tiene valor
    if (board[index] || winner) return

    // Actualizamos el board
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // Guardamos el board
    window.localStorage.setItem('board', JSON.stringify(newBoard))

    // Actualizamos el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // Guardamos el turno
    window.localStorage.setItem('turn', JSON.stringify(newTurn))

    // Actualizamos ganador
    if (checkWinner(newBoard)) {
      setWinner(turn)
      confetti()
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  return (
    <main className='min-h-screen bg-neutral-800 text-white flex items-center justify-center relative'>
      <div className='text-center flex flex-col gap-5'>
        <header className='text-4xl font-bold tracking-wide'>Tic Tac Toe</header>
        <section className='grid grid-cols-3 gap-2'>
          {
            board.map((element, index) => (
              <Square
                key={index}
                index={index}
                updateSquare={updateSquare}
              >
                {board[index]}
              </Square>
            ))
          }
        </section>
        <footer className='flex items-center justify-center gap-3'>
          <Turn isSelected={turn === TURNS.X}>{TURNS.X}</Turn>
          <Turn isSelected={turn === TURNS.O}>{TURNS.O}</Turn>
        </footer>
        {
          winner !== null && (
            <div className='absolute top-0 left-0 inset-0 bg-black/50 flex items-center justify-center'>
              <div className='bg-gray-800 max-w-xs w-full flex flex-col gap-4 p-10 rounded-lg'>
                <h2 className='text-4xl'>Fin del juego</h2>
                {
                  winner === false
                    ? (<p className='text-2xl font-semibold'>Empate</p>)
                    : (
                      <div className='flex items-center justify-center flex-col'>
                        <p className='text-2xl font-semibold text-indigo-400 mb-1'>Ganó</p>
                        <p className='border font-semibold text-2xl w-10 h-10 grid place-content-center rounded-lg'>{winner}</p>
                      </div>
                      )
                }
                <button onClick={resetGame} className='bg-indigo-400/70 hover:bg-indigo-400 self-center transition-colors font-semibold px-4 py-2 rounded-lg'>Voler a jugar</button>
              </div>
            </div>
          )
        }
      </div>
    </main>
  )
}

export default App
