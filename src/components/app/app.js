import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import ErrorBoundary from '../error-boundry'
import Header from '../header'
import BlogsPage from '../blogsPage'
import OneBlogPage from '../oneBlogPage'
import SignUpPages from '../pages/signUpPages'
import SignInPages from '../pages/signInPages'
import ProfilePages from '../pages/prifilePages'
import { logInSuccsess } from '../../redux/actions'

import './app.scss'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token')
    // console.log(token)
    if (token) {
      const user = {
        username: localStorage.getItem('username'),
        email: localStorage.getItem('email'),
        token: localStorage.getItem('token'),
        image: localStorage.getItem('image'),
      }
      // console.log(user)
      dispatch(logInSuccsess(user))
    }
  })

  return (
    <Router>
      <ErrorBoundary>
        <div className="app">
          <Header />
          <Switch>
            <Route exact path="/">
              <BlogsPage />
            </Route>
            <Route exact path="/blog/:id">
              <OneBlogPage />
            </Route>
            <Route exact path="/sign-up">
              <SignUpPages />
            </Route>
            <Route exact path="/sign-in">
              <SignInPages />
            </Route>
            <Route exact path="/profile">
              <ProfilePages />
            </Route>
          </Switch>
        </div>
      </ErrorBoundary>
    </Router>
  )
}

export default App
