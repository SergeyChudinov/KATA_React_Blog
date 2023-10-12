import './blogPage.scss'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'

import heart from './heart.svg'

function BlogPage({
  data: {
    title,
    favoritesCount,
    tagList,
    body,
    updatedAt,
    slug,
    author: { username, image },
  },
  dataType,
}) {
  const blogList = tagList.map((tag, i) => {
    return (
      <li key={i} className="blog__list-item">
        {tag}
      </li>
    )
  })

  const formattedDate = format(new Date(updatedAt), 'MMMM d, yyyy')

  const clazz = dataType === 'min' ? 'min' : 'max'

  const section = (
    <section className={`blog blog-${clazz}`}>
      <div className="blog__container">
        <div className="blog__block">
          <h2 className="blog__title">S{title}</h2>
          <img className="blog__heart" src={heart} alt="heart" />
          <span className="blog__favorited">{favoritesCount}</span>
        </div>
        <div className="blog__tagList">
          <ul className="blog__list">{blogList}</ul>
        </div>
        <div className="blog_body">
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
      </div>
      <div className="blog__author">
        <div className="blog__case">
          <p className="blog__name">{username}</p>
          <p className="blog__created">{formattedDate}</p>
        </div>
        <img className="blog__avatar" src={image} alt="avatar" />
      </div>
    </section>
  )

  if (dataType === 'min') {
    return (
      <Link className="blog__link" to={`blog/${slug}`}>
        {section}
      </Link>
    )
  } else {
    return <>{section}</>
  }
}

export default BlogPage
