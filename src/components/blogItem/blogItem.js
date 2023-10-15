import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'

import heart from './heart.svg'

import './blogItem.scss'

function BlogItem({
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
      <li key={i} className="blogItem__tagList_list-item">
        {tag}
      </li>
    )
  })

  const formattedDate = format(new Date(updatedAt), 'MMMM d, yyyy')

  const section = (
    <section className="blogItem">
      <div className="blogItem__container">
        <div className="blogItem__block">
          <h2 className="blogItem__title">S{title}</h2>
          <img className="blogItem__heart" src={heart} alt="heart" />
          <span className="blogItem__favorited">{favoritesCount}</span>
        </div>
        <div className="blogItem__tagList">
          <ul className="blogItem__tagList_list">{blogList}</ul>
        </div>
        <div className="blogItem_body">
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
      </div>
      <div className="blogItem__author">
        <div className="blogItem__case">
          <p className="blogItem__name">{username}</p>
          <p className="blogItem__created">{formattedDate}</p>
        </div>
        <img className="blogItem__avatar" src={image} alt="avatar" />
      </div>
    </section>
  )

  return <>{section}</>
}

export default BlogItem
