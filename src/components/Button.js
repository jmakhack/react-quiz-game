import React from 'react'
import PropTypes from 'prop-types'
import './Button.css'

/**
 * Simple button component
 * @param {*} props
 */
const Button = props => {
  return (
    <button className='button' onClick={props.onClick}>
      {props.label}
    </button>
  )
}

Button.propTypes = {
  /** Click handler for button */
  onClick: PropTypes.func,
  /** Button label to display */
  label: PropTypes.string
}

export default Button
