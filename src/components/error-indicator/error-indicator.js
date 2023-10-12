import React from 'react'

import './error-indicator.scss'
import icon from './wrong.png'

const ErrorIndicator = ({ message }) => {
  return (
    <div className="error-indicator">
      <img src={icon} alt="error icon" />
      <span className="boom">{message}</span>
      <span>something has gone terribly wrong</span>
      <span>(but we already sent slave to fix it)</span>
    </div>
  )
}

export default ErrorIndicator
