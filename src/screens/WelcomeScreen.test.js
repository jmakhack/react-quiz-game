import React from 'react'
import { shallow, mount, render } from 'enzyme'
import 'jest-enzyme'
import WelcomeScreen from './WelcomeScreen'

it('renders without crashing', () => {
  render(<WelcomeScreen eventEmitter={{}}/>)
})

it('should be selectable by class "WelcomeScreen"', () => {
  expect(shallow(<WelcomeScreen eventEmitter={{}}/>)).toHaveClassName('WelcomeScreen')
})

it('should contain div with class "header"', () => {
  expect(shallow(<WelcomeScreen eventEmitter={{}}/>).find('.header')).toHaveTagName('div')
})

it('renders a welcome message in header', () => {
  expect(shallow(<WelcomeScreen eventEmitter={{}}/>).find('.header')).toHaveText()
})

it('renders a button with label "Start"', () => {
  const wrapper = mount(<WelcomeScreen eventEmitter={{}}/>)
  expect(wrapper.find('button')).toHaveText('Start')
})

it('emits event when start button is clicked', () => {
  const emitter = { emit: jest.fn() }
  const wrapper = mount(<WelcomeScreen eventEmitter={emitter}/>)
  wrapper.find('button').simulate('click')
  expect(emitter.emit).toBeCalled()
})
