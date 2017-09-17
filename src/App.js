import React, { Component } from 'react'
import _ from 'lodash'
import './App.css'

// Screen enum used for managing state
const Screen = Object.freeze({
  START: Symbol('start'),
  QUESTION: Symbol('question'),
  END: Symbol('end')
})

// Message to display on app startup
const welcomeMessage = `Welcome to the Rock, Paper, Scissors Quiz Game!`

class App extends Component {
  state = {
    screen: Screen.START,
    score: 0,
    header: welcomeMessage,
    answer: ''
  }

  onClickStart() {
    // Reset score and start showing quesitons
    this.setState({
      screen: Screen.QUESTION,
      score: 0
    })
    this.showNextQuestion()
  }

  onClickAnswer(selection) {
    const { answer, score } = this.state

    // Increase score and show next question if answer
    // is correct else show the end screen
    if (selection === answer) {
      this.setState({
        score: score + 1,
      })
      this.showNextQuestion()
    } else {
      this.showEndScreen()
    }
  }

  showNextQuestion() {
    const { header } = this.state

    // Create array of question and answer pairs
    const questions = [
      {
        question: `Bigger versions of this object are usually referred to as 'shears'`,
        answer: 'scissors'
      }, {
        question: `A _____-pusher is defined as 'a bureaucrat or menial clerical worker'`,
        answer: 'paper'
      }, {
        question: `Dwayne Douglas Johnson is most commonly known by his ring name: The _____`,
        answer: 'rock'
      }
    ]

    // Ensure that the next question is not a duplicate of the previous one
    let nextItem;
    do {
      nextItem = _.sample(questions)
    } while (nextItem.question === header)

    // Update question and answer in state
    this.setState({
      header: nextItem.question,
      answer: nextItem.answer
    })
  }

  showEndScreen() {
    const { score } = this.state

    // Display final score on end screen
    const header = `Final Score: ${score}`
    this.setState({
      screen: Screen.END,
      header
    })
  }

  getButtons() {
    const { screen } = this.state

    // Display correct set of buttons based on current view state
    if (screen === Screen.START) {
      return <button onClick={() => this.onClickStart()}>Start</button>
    } else if (screen === Screen.QUESTION) {
      return (
        <div>
          <button onClick={() => this.onClickAnswer('rock')}>Rock</button>
          <button onClick={() => this.onClickAnswer('paper')}>Paper</button>
          <button onClick={() => this.onClickAnswer('scissors')}>Scissors</button>
        </div>
      )
    } else if (screen === Screen.END) {
      return <button onClick={() => this.onClickStart()}>Try Again</button>
    }
  }

  render() {
    const { screen, header, score } = this.state

    // Show score display while questions are being answered
    let scoreDisplay = null
    if (screen === Screen.QUESTION) {
      scoreDisplay = `Score: ${score}`
    }

    return (
      <div className="App">
        <div className="content">
          {scoreDisplay}
          <div className="header">
            {header}
          </div>
          <div className="buttons">
            {this.getButtons()}
          </div>
        </div>
      </div>
    )
  }
}

export default App
