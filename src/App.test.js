import React from 'react'
import { shallow, mount, render } from 'enzyme'
import 'jest-enzyme'
import App from './App'
import WelcomeScreen from './screens/WelcomeScreen'
import QuestionScreen from './screens/QuestionScreen'
import EndScreen from './screens/EndScreen'

it('renders without crashing', () => {
  render(<App />)
})

it('renders with accurate initial state', () => {
  const wrapper = shallow(<App />)
  expect(wrapper).toHaveState('activeScreen', 'start')
  expect(wrapper).toHaveState('score', 0)
})

it('should be selectable by class "App"', () => {
  expect(shallow(<App />)).toHaveClassName('App')
})

it('should contain div with class "content"', () => {
  expect(shallow(<App />).find('.content')).toHaveTagName('div')
})

it('responds correctly to global events', () => {
  const wrapper = mount(<App />)
  const eventEmitter = wrapper.instance().eventEmitter
  eventEmitter.emit('showNextScreen')
  expect(wrapper).toHaveState('activeScreen', 'question')
  eventEmitter.emit('showNextScreen')
  expect(wrapper).toHaveState('activeScreen', 'end')
  eventEmitter.emit('showNextScreen')
  expect(wrapper).toHaveState('activeScreen', 'start')
  eventEmitter.emit('showNextScreen')
  eventEmitter.emit('incrementScore', 9999)
  expect(wrapper).toHaveState('score', 9999)
  eventEmitter.emit('incrementScore', 1)
  expect(wrapper).toHaveState('score', 10000)
  eventEmitter.emit('resetQuiz')
  expect(wrapper).toHaveState('activeScreen', 'start')
  expect(wrapper).toHaveState('score', 0)
})

it('renders welcome screen on initial render', () => {
  const wrapper = mount(<App />)
  const eventEmitter = wrapper.instance().eventEmitter
  expect(wrapper).toContainReact(<WelcomeScreen eventEmitter={eventEmitter}/>)
})

it('renders screen based on current state', () => {
  const wrapper = mount(<App />)
  const eventEmitter = wrapper.instance().eventEmitter
  wrapper.setState({
    activeScreen: 'question'
  }, () => {
    expect(wrapper).toContainReact(<QuestionScreen eventEmitter={eventEmitter} score={0}/>)
  })
  wrapper.setState({
    activeScreen: 'end'
  }, () => {
    expect(wrapper).toContainReact(<EndScreen eventEmitter={eventEmitter} score={0}/>)
  })
  wrapper.setState({
    activeScreen: 'start'
  }, () => {
    expect(wrapper).toContainReact(<WelcomeScreen eventEmitter={eventEmitter}/>)
  })
})

it('renders blank screen on invalid activeScreen state', () => {
  const wrapper = shallow(<App />)
  wrapper.setState({
    activeScreen: 'invalidScreen'
  }, () => {
    expect(wrapper.find('.content')).toHaveHTML('<div class="content"></div>')
  })
})
