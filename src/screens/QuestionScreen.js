import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../components/Button'
import _ from 'lodash'
import './Screen.css'

class QuestionScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      curQuestion: '',
      correctAnswer: ''
    }
  }

  componentWillMount() {
    this.showNextQuestion()
  }

  showNextQuestion() {
    const { curQuestion } = this.state

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
    let nextItem
    do {
      nextItem = _.sample(questions)
    } while (nextItem.question === curQuestion)

    // Update question and answer in state
    this.setState({
      curQuestion: nextItem.question,
      correctAnswer: nextItem.answer
    })
  }

  onClickAnswer(answer) {
    const { correctAnswer } = this.state
    if (answer === correctAnswer) {
      this.props.eventEmitter.emit('incrementScore', 1)
      this.showNextQuestion()
    } else {
      this.props.eventEmitter.emit('showNextScreen', 'end')
    }
  }

  render() {
    return (
      <div>
        Score: {this.props.score}
        <div className="header">
          {this.state.curQuestion}
        </div>
        <Button onClick={() => this.onClickAnswer('rock')} label='Rock'/>
        <Button onClick={() => this.onClickAnswer('paper')} label='Paper'/>
        <Button onClick={() => this.onClickAnswer('scissors')} label='Scissors'/>
      </div>
    )
  }
}

QuestionScreen.propTypes = {
  eventEmitter: PropTypes.object.isRequired,
  score: PropTypes.number.isRequired
}

export default QuestionScreen