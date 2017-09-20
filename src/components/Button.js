import React from 'react'
import PropTypes from 'prop-types'
import './Button.css'

const Button = props => {
  return (
    <button className='button' onClick={props.onClick}>
      {props.label}
    </button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string
}

export default Button
