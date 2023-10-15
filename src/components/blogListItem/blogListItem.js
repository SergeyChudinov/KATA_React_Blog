import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'

import heart from './heart.svg'

import './blogListItem.scss'

function BlogListItem({
  data: {
    title,
    favoritesCount,
    tagList,
    body,
    updatedAt,
    slug,
    author: { username, image },
  },
}) {
  const blogList = tagList.map((tag, i) => {
    return (
      <li key={i} className="blogListItem__tagList_list-item">
        {tag}
      </li>
    )
  })

  const formattedDate = format(new Date(updatedAt), 'MMMM d, yyyy')

  return (
    <Link className="blogListItem__link" to={`blog/${slug}`}>
      <section className="blogListItem">
        <div className="blogListItem__container">
          <div className="blogListItem__block">
            <h2 className="blogListItem__title">S{title}</h2>
            <img className="blogListItem__heart" src={heart} alt="heart" />
            <span className="blogListItem__favorited">{favoritesCount}</span>
          </div>
          <div className="blogListItem__tagList">
            <ul className="blogListItem__tagList_list">{blogList}</ul>
          </div>
          <div className="blogListItem_body">
            <ReactMarkdown>{body}</ReactMarkdown>
          </div>
        </div>
        <div className="blogListItem__author">
          <div className="blogListItem__case">
            <p className="blogListItem__name">{username}</p>
            <p className="blogListItem__created">{formattedDate}</p>
          </div>
          <img className="blogListItem__avatar" src={image} alt="avatar" />
        </div>
      </section>
    </Link>
  )
}

export default BlogListItem