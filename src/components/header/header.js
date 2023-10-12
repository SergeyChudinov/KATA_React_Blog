import React from 'react'
import { Link } from 'react-router-dom'

import './header.scss'

function Header() {
  // foo.bar = 0
  return (
    <div className="header">
      <Link className="header__link" to="/">
        Realworld Blog
      </Link>
      <div>
        <button className="btn signInBtn">Sign In</button>
        <button className="btn signUpBtn">Sign Up</button>
      </div>
    </div>
  )
}

export default Header
