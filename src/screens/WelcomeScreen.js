import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Button from '../components/Button'
import './Screen.css'

/**
 * Initial welcome screen for the quiz app
 *
 * @class WelcomeScreen
 * @extends {PureComponent}
 */
class WelcomeScreen extends PureComponent {
  /**
   * Click handler for the start button
   *
   * @memberof WelcomeScreen
   */
  onClickStart() {
    this.props.eventEmitter.emit('showNextScreen')
  }

  /** @inheritdoc */
  render() {
    return (
      <div className="WelcomeScreen">
        <div className="header">
          Welcome to the Rock, Paper, Scissors Quiz Game!
        </div>
        <Button onClick={() => this.onClickStart()} label="Start"/>
      </div>
    )
  }
}

WelcomeScreen.propTypes = {
  /** Global event emitter */
  eventEmitter: PropTypes.object.isRequired
}

export default WelcomeScreen
