import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Button from '../components/Button.js'
import './Screen.css'

class EndScreen extends PureComponent {
  onClickRestart() {
    this.props.eventEmitter.emit('resetQuiz')
  }

  render() {
    return (
      <div>
        Thanks for playing!
        <div className="header">
          Final Score: {this.props.score}
        </div>
        <Button onClick={() => this.onClickRestart()} label='Try Again'/>
      </div>
    )
  }
}

EndScreen.PropTypes = {
  eventEmitter: PropTypes.object.isRequired,
  score: PropTypes.number.isRequired
}

export default EndScreen