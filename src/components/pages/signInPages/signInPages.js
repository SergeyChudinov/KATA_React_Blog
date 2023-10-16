import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Redirect, Link } from 'react-router-dom'

import { logInStrarted, logInSuccsess, logInFailure, dataIsNotCrrect } from '../../../redux/actions'
import BlogService from '../../../services/blog-services'
import ErrorIndicator from '../../error-indicator/error-indicator'
import Spinner from '../../spinner/spinner'

import './signInPages.scss'

const SignInPages = () => {
  const [incorrectLogin, setIncorrectLogin] = useState(false)
  const { token, error, loading } = useSelector((state) => state.user)
  const isLoggedIn = token ? true : false

  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    const blogService = new BlogService()

    const user = {
      user: {
        email: data.email,
        password: data.password,
      },
    }
    const json = JSON.stringify(user)
    dispatch(logInStrarted())

    blogService
      .signIn(json)
      .then((user) => {
        dispatch(logInSuccsess(user))
        localStorage.setItem('username', user.username)
        localStorage.setItem('token', user.token)
        localStorage.setItem('image', user.image)
      })
      .catch((e) => {
        if (e.message.includes('Неправильный пароль')) {
          setIncorrectLogin(true)
          dispatch(dataIsNotCrrect())
        } else {
          dispatch(logInFailure(e))
        }
      })
  }

  const incorrectLoginMessage = incorrectLogin ? (
    <div>
      <span>Неправильный логин или пароль</span>
    </div>
  ) : null

  const email = register('email', {
    required: true,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  })

  const password = register('password', {
    required: true,
    minLength: 6,
    maxLength: 40,
  })

  const elements = (
    <form className="signIn" onSubmit={handleSubmit(onSubmit)}>
      <h1>Sign In</h1>

      <label className="signIn__email" htmlFor="email">
        Email address
      </label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email address"
        {...email}
        style={{ borderColor: errors.email ? 'red' : '#D9D9D9' }}
      />
      {errors.email && (
        <div>
          <span>Please enter a valid email address</span>
        </div>
      )}

      <label className="signIn__password" htmlFor="password">
        Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        {...password}
        style={{ borderColor: errors.password ? 'red' : '#D9D9D9' }}
      />
      {errors.password && (
        <div>
          <span>Пароль должен содержать от 6 до 40 символов</span>
        </div>
      )}
      {incorrectLoginMessage}

      <button type="submit">Login</button>

      <p>
        Already have an account?
        <Link to="/sign-up"> Sign Up</Link>
      </p>
    </form>
  )

  const errorMessage = error ? <ErrorIndicator message={error.message} /> : null
  const spinner = loading ? <Spinner /> : null
  const content = spinner || errorMessage || elements

  return (
    <>
      {isLoggedIn && <Redirect to="/" />}
      {content}
    </>
  )
}

export default SignInPages
