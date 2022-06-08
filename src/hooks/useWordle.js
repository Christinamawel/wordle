import { useState } from 'react';

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0)
  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, setGuesses] = useState([[],[],[],[],[], []]) // each guess is an array
  const [history, setHistory] = useState([]) // each guess is a string
  const [isCorrect, setIsCorrect] = useState(false)

  // format a guess into an array of letter objects
  // e.g. [{'key': 'a', 'color': 'yellow'}]
  const formatGuess = () => {
    let solutionArray = [...solution]
    let formattedGuess = [...currentGuess.toLowerCase()].map((l) => {
      return {key: l, color: 'grey'}
    })
    formattedGuess.forEach((l, i) => {
      if(solutionArray[i] === l.key) {
        l.color = 'green'
        solutionArray[i] = null
      }
    })

    formattedGuess.forEach(l => {
      if(solutionArray.includes(l.key) && l.color !== 'green') {
        l.color = 'yellow'
        solutionArray[solutionArray.indexOf(l.key)] = null
      }
    })

    return formattedGuess
  }

  // add a new guess to the guesses state
  // update the isCorrect state if the guess is correct
  // add one to turn state
  const addNewGuess = (formattedGuess) => {
    if(currentGuess === solution) {
      setIsCorrect(true)
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses]
      newGuesses[turn] = formattedGuess
      return newGuesses
    })
    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess]
    })
    setTurn((prevTurn) => {
      return prevTurn + 1
    })
    setCurrentGuess('')
  }

  // handle keyup event & track current guess
  // if user presses enter, add the new guess
  const handleKeyup = ({ key }) => {
    if(key === 'Enter') {
      if(turn > 5) {
        console.log('youve used all your guesses')
        return
      }
      if(history.includes(currentGuess.toLowerCase())) {
        console.log('you already guessed this word')
        return
      }
      if(currentGuess.length !== 5) {
        console.log('guess needs to be 5 letters long')
        return
      }
      const formatted = formatGuess()
      addNewGuess(formatted)
    }
    if(key === 'Backspace') {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1)
      })
      return
    }
    if (/^[A-Za-z]$/.test(key)) {
      if(currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + key
        })
      }
    }
  }

  return {turn, currentGuess, guesses, isCorrect, handleKeyup}

}

export default useWordle