import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
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
  const blogsService = new BlogService()

  useEffect(() => {
    if (id) updateBlog()
  }, [])

  const updateBlog = () => {
    addBlogStrarted()
    blogsService
      .getSlug(id)
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

  return <section className="oneBlog">{content}</section>
}

const mapStateToProps = (state) => {
  return {
    blog: state.blog.blog,
    error: state.blog.error,
    loading: state.blog.loading,
  }
}

export default connect(mapStateToProps, actions)(OneBlogPage)
