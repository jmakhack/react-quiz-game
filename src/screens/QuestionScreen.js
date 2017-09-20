import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Button from '../components/Button'
import './Screen.css'

/**
 * Main quiz screen that displays questions and answer choices
 *
 * @class QuestionScreen
 * @extends {Component}
 */
class QuestionScreen extends Component {
  /** @inheritdoc */
  constructor(props) {
    super(props)
    this.state = {
      curQuestion: '',
      correctAnswer: ''
    }
  }

  /** @inheritdoc */
  componentWillMount() {
    this.showNextQuestion()
  }

  /**
   * Change state to display next quiz question
   *
   * @memberof QuestionScreen
   */
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

  /**
   * Click handler for answer buttons
   *
   * @param {string} answer
   * @memberof QuestionScreen
   */
  onClickAnswer(answer) {
    const { correctAnswer } = this.state
    if (answer === correctAnswer) {
      this.props.eventEmitter.emit('incrementScore', 1)
      this.showNextQuestion()
    } else {
      this.props.eventEmitter.emit('showNextScreen', 'end')
    }
  }

  /** @inheritdoc */
  render() {
    return (
      <div className="QuestionScreen">
        Score: {this.props.score}
        <div className="header">
          {this.state.curQuestion}
        </div>
        <Button onClick={() => this.onClickAnswer('rock')} label="Rock"/>
        <Button onClick={() => this.onClickAnswer('paper')} label="Paper"/>
        <Button onClick={() => this.onClickAnswer('scissors')} label="Scissors"/>
      </div>
    )
  }
}

QuestionScreen.propTypes = {
  /** Global event emitter */
  eventEmitter: PropTypes.object.isRequired,
  /** Current quiz score */
  score: PropTypes.number.isRequired
}

export default QuestionScreen
