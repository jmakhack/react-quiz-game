import React from 'react'
import { shallow, render } from 'enzyme'
import 'jest-enzyme'
import Button from './Button'

it('renders without crashing', () => {
  render(<Button />)
})

it('should be selectable by class "Button"', () => {
  expect(shallow(<Button />)).toHaveClassName('Button')
})

it('should contain button with class "button"', () => {
  expect(shallow(<Button />).find('.button')).toHaveTagName('button')
})

it('responds to click events', () => {
  const onClick = jest.fn()
  const wrapper = shallow(<Button onClick={onClick}/>)
  wrapper.find('button').simulate('click')
  expect(onClick).toBeCalled()
})

it('displays label in button', () => {
  const label = 'Test Label'
  const wrapper = shallow(<Button label={label}/>)
  expect(wrapper.find('.button')).toHaveText(label)
})
