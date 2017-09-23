import React from 'react'
import { shallow, mount, render } from 'enzyme'
import 'jest-enzyme'
import EndScreen from './EndScreen'

it('renders without crashing', () => {
  render(<EndScreen eventEmitter={{}} score={0}/>)
})

it('should be selectable by class "EndScreen"', () => {
  expect(shallow(<EndScreen eventEmitter={{}} score={0}/>)).toHaveClassName('EndScreen')
})

it('should contain div with class "header"', () => {
  expect(shallow(<EndScreen eventEmitter={{}} score={0}/>).find('.header')).toHaveTagName('div')
})

it('renders a message in header', () => {
  expect(shallow(<EndScreen eventEmitter={{}}/>).find('.header')).toHaveText()
})

it('renders a button with label "Try Again"', () => {
  const wrapper = mount(<EndScreen eventEmitter={{}}/>)
  expect(wrapper.find('button')).toHaveText('Try Again')
})

it('renders header with final score value', () => {
  const wrapper = shallow(<EndScreen eventEmitter={{}} score={42}/>)
  expect(wrapper.find('.header')).toIncludeText('42')
})

it('emits event when restart button is clicked', () => {
  const emitter = { emit: jest.fn() }
  const wrapper = mount(<EndScreen eventEmitter={emitter} score={0}/>)
  wrapper.find('button').simulate('click')
  expect(emitter.emit).toBeCalled()
})
