import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useParams, Redirect } from 'react-router-dom'

import {
  addBlogStarted,
  addBlogSuccsess,
  addBlogFailure,
  deleteBlogStarted,
  deleteBlogSuccsess,
  deleteBlogFailure,
} from '../../redux/actions'
import BlogService from '../../services/blog-services'
import BlogItem from '../blogItem'
import ErrorIndicator from '../error-indicator/error-indicator'
import Spinner from '../spinner/spinner'

import './blog.scss'

function Blog() {
  const [blogIsDelete, setBlogIsDelete] = useState(false)
  const [favorited, setFavorited] = useState(null)
  const { blog, error, loading } = useSelector((state) => state.blog)
  const { userName } = useSelector((state) => state.user)
  const { id } = useParams()
  const dispatch = useDispatch()

  const token = localStorage.getItem('token')
  const isLoggedIn = token ? true : false
  const blogsService = new BlogService()

  useEffect(() => {
    if (id) getBlog()
    setBlogIsDelete(false)
  }, [])

  useEffect(() => {
    setFavorited(blog.favorited)
  }, [blog])

  const getBlog = () => {
    dispatch(addBlogStarted())
    blogsService
      .getArticle(id, token)
      .then((res) => {
        onBlogLoaded(res)
      })
      .catch((e) => dispatch(addBlogFailure(e)))
  }

  const confirmDeleteTag = () => {
    if (confirm('Вы уверены, что хотите удалить?')) {
      handleDeleteTag()
      alert('Удалено успешно!')
    } else {
      alert('Удаление отменено.')
    }
  }

  const handleDeleteTag = () => {
    const blogService = new BlogService()
    dispatch(deleteBlogStarted())

    blogService
      .deleteArticle(token, blog.slug)
      .then(() => {
        setBlogIsDelete(true)
        dispatch(deleteBlogSuccsess())
      })
      .catch((e) => {
        dispatch(deleteBlogFailure(e.message))
      })
  }

  const handleToggleFavorite = () => {
    if (!favorited) {
      blogsService.favoriteAnArticle(token, blog.slug).then(() => {
        setFavorited(true)
      })
    } else {
      blogsService.unfavoriteAnArticle(token, blog.slug)
      setFavorited(false)
    }
  }

  const onBlogLoaded = (blog) => {
    dispatch(addBlogSuccsess(blog))
  }

  const errorMessage = error ? <ErrorIndicator message={error} /> : null
  const spinner = loading ? <Spinner /> : null
  const content =
    spinner ||
    errorMessage ||
    (blog.slug ? (
      <BlogItem
        data={blog}
        userName={userName}
        favorited={favorited}
        handleDeleteTag={confirmDeleteTag}
        handleToggleFavorite={handleToggleFavorite}
      />
    ) : null)

  return (
    <>
      {!isLoggedIn && <Redirect to="/sign-in" />}
      {blogIsDelete && <Redirect to="/" />}
      <div className="blog">{content}</div>
    </>
  )
}

export default Blog
