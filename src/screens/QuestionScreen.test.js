import React from 'react'
import { shallow, mount, render } from 'enzyme'
import 'jest-enzyme'
import QuestionScreen from './QuestionScreen'

it('renders without crashing', () => {
  render(<QuestionScreen eventEmitter={{}} score={0}/>)
})

it('should be selectable by class "QuestionScreen"', () => {
  expect(shallow(<QuestionScreen eventEmitter={{}} score={0}/>)).toHaveClassName('QuestionScreen')
})

it('should contain div with class "header"', () => {
  expect(shallow(<QuestionScreen eventEmitter={{}} score={0}/>).find('.header')).toHaveTagName('div')
})

it('renders a message in header', () => {
  expect(shallow(<QuestionScreen eventEmitter={{}} score={0}/>).find('.header')).toHaveText()
})

it('renders three buttons', () => {
  const wrapper = mount(<QuestionScreen eventEmitter={{}} score={0}/>)
  expect(wrapper.find('button')).toHaveLength(3)
})

it('renders score on page', () => {
  const wrapper = shallow(<QuestionScreen eventEmitter={{}} score={42}/>)
  expect(wrapper).toIncludeText(42)
})

it('renders question based on state', () => {
  const wrapper = mount(<QuestionScreen eventEmitter={{}} score={0}/>)
  wrapper.setState({
	  curQuestion: 'test question'
  }, () => {
	  expect(wrapper.find('.header')).toHaveText('test question')
  })
})

it('emits event when correct answer is clicked', () => {
  const emitter = { emit: jest.fn() }
  const wrapper = mount(<QuestionScreen eventEmitter={emitter} score={0}/>)
  wrapper.setState({
	correctAnswer: 'rock'
  }, () => {
    wrapper.find('button').first().simulate('click')
    expect(emitter.emit).toBeCalled()
  })
})

it('emits events when wrong answers are clicked', () => {
  const emitter = { emit: jest.fn() }
  const wrapper = mount(<QuestionScreen eventEmitter={emitter} score={0}/>)
  wrapper.setState({
	correctAnswer: 'rock'
  }, () => {
    wrapper.find('button').at(1).simulate('click')
    wrapper.find('button').last().simulate('click')
    expect(emitter.emit.mock.calls).toHaveLength(2)
  })
})
