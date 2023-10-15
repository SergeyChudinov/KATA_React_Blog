import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'

import ErrorBoundary from '../error-boundry'
import Header from '../header'
import BlogsPage from '../blogsPage'
import OneBlogPage from '../oneBlogPage'
import SignUpPages from '../pages/signUpPages'
import SignInPages from '../pages/signInPages'
import ProfilePages from '../pages/prifilePages'
import CreateArticle from '../pages/createArticle'
import { logInSuccsess } from '../../redux/actions'

const Main = () => {
  const history = useHistory()
  const [currentPage, setCurrentPage] = useState('')

  useEffect(() => {
    const storedPage = localStorage.getItem('currentPage')
    if (storedPage) {
      setCurrentPage(storedPage)
      history.push(storedPage)
    }
  }, [])

  useEffect(() => {
    const unlisten = history.listen((location) => {
      setCurrentPage(location.pathname)
      localStorage.setItem('currentPage', location.pathname)
    })

    return () => {
      unlisten()
    }
  }, [history])
  console.log(currentPage)
  return (
    <>
      {currentPage && <Redirect to={currentPage} />}
      <h1>Текущая страница: {currentPage}</h1>
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
        <Route exact path="/new-article">
          <CreateArticle />
        </Route>
      </Switch>
    </>
  )
}

export default Main
