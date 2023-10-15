import { useSelector, connect, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useParams, Redirect } from 'react-router-dom'

import { addBlogStarted, addBlogSuccsess, addBlogFailure } from '../../redux/actions'
import BlogService from '../../services/blog-services'
import BlogItem from '../blogItem'
import ErrorIndicator from '../error-indicator/error-indicator'
import Spinner from '../spinner/spinner'

import './blog.scss'

// function Blog({ blog, error, loading, addBlogStrarted, addBlogSuccsess, addBlogFailure }) {
function Blog({ itemId }) {
  const token = useSelector((state) => state.user.token)
  const { blog, error, loading } = useSelector((state) => state.blog)
  // const { id } = useParams()
  const dispatch = useDispatch()

  const isLoggedIn = token ? true : false

  const blogsService = new BlogService()

  useEffect(() => {
    if (itemId) updateBlog()
  }, [])

  const updateBlog = () => {
    dispatch(addBlogStarted())
    blogsService
      .getArticle(itemId, token)
      .then((res) => {
        onBlogLoaded(res)
      })
      .catch((e) => dispatch(addBlogFailure(e)))
  }

  const onBlogLoaded = (blog) => {
    dispatch(addBlogSuccsess(blog))
  }

  // console.log(blog, error, loading)

  const errorMessage = error ? <ErrorIndicator message={error} /> : null
  const spinner = loading ? <Spinner /> : null
  const content = spinner || errorMessage || <BlogItem data={blog} dataType="max" />

  return (
    <>
      {!isLoggedIn && <Redirect to="/sign-in" />}
      <div className="blog">{content}</div>
    </>
  )
}

export default Blog
