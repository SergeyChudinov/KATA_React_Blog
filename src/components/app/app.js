import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

// import Main from '../main'
import ErrorBoundary from '../error-boundry'
import Header from '../header'
import BlogList from '../blogList'
import Blog from '../blog'
import SignUpPages from '../pages/signUpPages'
import SignInPages from '../pages/signInPages'
import ProfilePages from '../pages/prifilePages'
import CreateArticle from '../pages/createArticle'
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
          {/* <Main /> */}
          <Header />
          <Switch>
            <Route exact path="/">
              <BlogList />
            </Route>
            {/* <Route exact path="/blog/:id">
              <Blog />
            </Route> */}
            <Route
              exact
              path="/blog/:id"
              render={({ match }) => {
                const { id } = match.params
                return <Blog itemId={id} />
              }}
            />
            <Route exact path="/sign-up">
              <SignUpPages />
            </Route>
            <Route exact path="/sign-in">
              <SignInPages />
            </Route>
            <Route exact path="/profile">
              <ProfilePages />
            </Route>
            <Route exact path="/new-article">
              <CreateArticle />
            </Route>
          </Switch>
        </div>
      </ErrorBoundary>
    </Router>
  )
}

export default App
