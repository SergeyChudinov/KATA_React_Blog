import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { logOut } from '../../redux/actions'

import avatar from './avatar.svg'

import './header.scss'

function Header() {
  const user = useSelector((state) => state.user)
  const isLoggedIn = user.token ? true : false
  const dispatch = useDispatch()

  const logOutUser = () => {
    dispatch(logOut())
    localStorage.clear()
  }

  if (isLoggedIn) {
    const img = user.image ? user.image : avatar

    return (
      <header className="header">
        <Link className="header__link" to="/">
          Realworld Blog
        </Link>
        <div>
          <Link className="btn createBtn" to="/new-article">
            Create article
          </Link>
          <Link className="btn profileBtn" to="/profile">
            <div className="profileBtn__container">
              <p className="profileBtn__name">{user.userName}</p>
              <img className="profileBtn__avatar" src={img} alt="avatar" />
            </div>
          </Link>
          <button onClick={logOutUser} className="btn logOutBtn" to="/sign-up">
            Log out
          </button>
        </div>
      </header>
    )
  } else {
    return (
      <header className="header">
        <Link className="header__link" to="/">
          Realworld Blog
        </Link>
        <div>
          <Link className="btn signInBtn" to="/sign-in">
            Sign In
          </Link>
          <Link className="btn signUpBtn" to="/sign-up">
            Sign Up
          </Link>
        </div>
      </header>
    )
  }
}

export default Header
