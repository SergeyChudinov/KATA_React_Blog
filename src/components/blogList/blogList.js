import { useSelector, connect } from 'react-redux'
import { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

import * as actions from '../../redux/actions'
import BlogService from '../../services/blog-services'
import BlogListItem from '../blogListItem'
import ErrorIndicator from '../error-indicator/error-indicator'
import Spinner from '../spinner/spinner'
import Pagin from '../pagination/pagination'
import './blogList.scss'

function BlogList({ blogs, error, loading, addBlogsStarted, addBlogsSuccsess, addBlogsFailure }) {
  const [offset, setOffset] = useState(0)
  const [pages, sePages] = useState(null)
  const token = useSelector((state) => state.user.token)
  const isLoggedIn = token ? true : false
  // console.log(token)
  const blogsService = new BlogService()

  useEffect(() => {
    updateBlogs()
  }, [offset])

  const updateBlogs = () => {
    addBlogsStarted()
    blogsService
      .getArticles(offset, token)
      .then((res) => {
        onBlogsLoaded(res.articles)
        sePages(Math.ceil(res.articlesCount / 10))
      })
      .catch((e) => addBlogsFailure(e))
  }

  const onBlogsLoaded = (blogs) => {
    addBlogsSuccsess(blogs)
  }

  const nextPage = (page) => {
    setOffset((page - 1) * 10)
  }

  // console.log('blogs', blogs)

  const elements = blogs.map((blog) => {
    return <BlogListItem key={blog.slug} data={blog} />
  })

  const errorMessage = error ? <ErrorIndicator message={error} /> : null
  const spinner = loading ? <Spinner /> : null
  const content = spinner || errorMessage || elements

  return (
    <>
      {!isLoggedIn && <Redirect to="/sign-in" />}
      <div className="blogList">
        {content}
        <div className="pagination">
          <Pagin nextPage={nextPage} pages={pages} />
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs.blogs,
    error: state.blogs.error,
    loading: state.blogs.loading,
  }
}

export default connect(mapStateToProps, actions)(BlogList)
