import React, { useEffect, useState } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid'
import Keypad from './Keypad'
import Modal from './Modal'

export default function Wordle({ solution }) {
  const { currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys } = useWordle(solution)
  const [showModel, setShowModel] = useState(false)

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup)

    if(isCorrect) {
      setTimeout(() => setShowModel(true), 2000)
      window.removeEventListener('keyup', handleKeyup)
    }

    if(turn > 5) {
      setTimeout(() => setShowModel(true), 2000)
      window.removeEventListener('keyup', handleKeyup)
    }

    return () => window.removeEventListener('keyup', handleKeyup)
  }, [handleKeyup, isCorrect, turn])

  return (
    <div>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn}/>
      <Keypad usedKeys={usedKeys}/>
      {showModel && <Modal isCorrect={isCorrect} turn={turn} solution={solution}/>}
    </div>
  )
}