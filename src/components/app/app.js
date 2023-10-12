import { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import ErrorBoundary from '../error-boundry'
import Header from '../header'
import BlogsPage from '../blogsPage/blogsPage'
import OneBlogPage from '../oneBlogPage/oneBlogPage'
import BlogService from '../../services/blog-services'

import './app.scss'

function App() {
  useEffect(() => {
    // new BlogService().getArticles()
    // new BlogService().getSlug()
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
          </Switch>
        </div>
      </ErrorBoundary>
    </Router>
  )
}

export default App
