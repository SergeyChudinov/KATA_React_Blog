import { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../redux/actions'
import BlogService from '../../services/blog-services'
import BlogPage from '../blogPage/blogPage'
import ErrorIndicator from '../error-indicator/error-indicator'
import Spinner from '../spinner/spinner'
import Pagin from '../pagination/pagination'
import './blogsPage.scss'

function BlogsPage({ blogs, error, loading, addBlogsStrarted, addBlogsSuccsess, addBlogsFailure }) {
  const [offset, setOffset] = useState(0)
  const [pages, sePages] = useState(null)
  const blogsService = new BlogService()

  useEffect(() => {
    updateBlogs()
  }, [offset])

  const updateBlogs = () => {
    addBlogsStrarted()
    blogsService
      .getArticles(offset)
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
    return <BlogPage key={blog.slug} data={blog} dataType="min" />
  })

  const errorMessage = error ? <ErrorIndicator message={error} /> : null
  const spinner = loading ? <Spinner /> : null
  const content = spinner || errorMessage || elements

  return (
    <div className="blogs">
      {content}
      <div className="pagination">
        <Pagin nextPage={nextPage} pages={pages} />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs.blogs,
    error: state.blogs.error,
    loading: state.blogs.loading,
  }
}

export default connect(mapStateToProps, actions)(BlogsPage)
