import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Button from '../components/Button.js'
import './Screen.css'

/**
 * Screen displayed after quiz is over
 * 
 * @class EndScreen
 * @extends {PureComponent}
 */
class EndScreen extends PureComponent {
  /**
   * Click handler for the Try Again button
   *
   * @memberof EndScreen
   */
  onClickRestart() {
    this.props.eventEmitter.emit('resetQuiz')
  }

  /** @inheritdoc */
  render() {
    return (
      <div className="EndScreen">
        Thanks for playing!
        <div className="header">
          Final Score: {this.props.score}
        </div>
        <Button onClick={() => this.onClickRestart()} label="Try Again"/>
      </div>
    )
  }
}

EndScreen.PropTypes = {
  /** Global event emitter */
  eventEmitter: PropTypes.object.isRequired,
  /** Final quiz score */
  score: PropTypes.number.isRequired
}

export default EndScreen
