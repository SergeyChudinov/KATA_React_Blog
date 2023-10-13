import { useSelector, connect } from 'react-redux'
import { useEffect, useState } from 'react'
import { useParams, Redirect } from 'react-router-dom'
// import { format } from 'date-fns'

// import heart from './heart.svg'

import * as actions from '../../redux/actions'
import BlogService from '../../services/blog-services'
import BlogPage from '../blogPage'
// import BlogPageLayout from '../blogPageLayout/blogPageLayout'
import ErrorIndicator from '../error-indicator/error-indicator'
import Spinner from '../spinner/spinner'

import './oneBlogPage.scss'

function OneBlogPage({ blog, error, loading, addBlogStrarted, addBlogSuccsess, addBlogFailure }) {
  const { id } = useParams()
  const token = useSelector((state) => state.user.token)
  const isLoggedIn = token ? true : false

  const blogsService = new BlogService()

  useEffect(() => {
    if (id) updateBlog()
  }, [])

  const updateBlog = () => {
    addBlogStrarted()
    blogsService
      .getArticle(id, token)
      .then((res) => {
        onBlogLoaded(res)
      })
      .catch((e) => addBlogFailure(e))
  }

  const onBlogLoaded = (blog) => {
    addBlogSuccsess(blog)
  }

  // console.log(blog, error, loading)

  const errorMessage = error ? <ErrorIndicator message={error} /> : null
  const spinner = loading ? <Spinner /> : null
  const content = spinner || errorMessage || <BlogPage data={blog} dataType="max" />

  return (
    <>
      {!isLoggedIn && <Redirect to="/sign-in" />}
      <section className="oneBlog">{content}</section>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    blog: state.blog.blog,
    error: state.blog.error,
    loading: state.blog.loading,
  }
}

export default connect(mapStateToProps, actions)(OneBlogPage)
