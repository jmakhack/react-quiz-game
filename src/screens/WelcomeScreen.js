import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Button from '../components/Button'
import './Screen.css'

// Message to display on app startup
const welcomeMessage = 'Welcome to the Rock, Paper, Scissors Quiz Game!'

class WelcomeScreen extends PureComponent {
  onClickStart() {
    this.props.eventEmitter.emit('showNextScreen', 'question')
  }

  render() {
    return (
      <div>
        <div className="header">
          {welcomeMessage}
        </div>
        <Button onClick={() => this.onClickStart()} label="Start"/>
      </div>
    )
  }
}

WelcomeScreen.propTypes = {
  eventEmitter: PropTypes.object.isRequired
}

export default WelcomeScreen