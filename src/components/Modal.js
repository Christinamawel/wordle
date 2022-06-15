import React from 'react'

export default function Model({isCorrect, turn, solution}) {
  return (
    <div className='modal'>
      {isCorrect && (
        <div>
          <h1>You Win!</h1>
          <p className='solution'>{solution}</p>
          <p>You found the solution in {turn} guesses!</p>
        </div>
      )}
      {!isCorrect && (
        <div>
          <h1>Too many guesses :(</h1>
          <p className='solution'>{solution}</p>
          <p>better luck next time</p>
        </div>
      )}
    </div>
  )
}