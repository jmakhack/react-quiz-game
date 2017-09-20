import React, { Component } from 'react'
import { EventEmitter } from 'events'
import WelcomeScreen from './screens/WelcomeScreen'
import QuestionScreen from './screens/QuestionScreen'
import EndScreen from './screens/EndScreen'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeScreen: 'start',
      score: 0
    }
  }

  componentWillMount() {
    this.eventEmitter = new EventEmitter()

    this.eventEmitter.addListener('showNextScreen', nextScreen => {
      this.setState({
        activeScreen: nextScreen
      })
    })

    this.eventEmitter.addListener('incrementScore', increment => {
      const { score } = this.state
      this.setState({
        score: score + increment
      })
    })

    this.eventEmitter.addListener('resetQuiz', () => {
      this.setState({
        activeScreen: 'start',
        score: 0
      })
    })
  }

  getActiveScreen() {
    const { activeScreen, score } = this.state

    switch(activeScreen) {
      case 'start':
        return <WelcomeScreen eventEmitter={this.eventEmitter}/>
      case 'question':
        return <QuestionScreen eventEmitter={this.eventEmitter} score={score}/>
      case 'end':
        return <EndScreen eventEmitter={this.eventEmitter} score={score}/>
      default:
        return null
    }
  }

  render() {
    return (
      <div className="App">
        <div className="content">
          {this.getActiveScreen()}
        </div>
      </div>
    )
  }
}

export default App