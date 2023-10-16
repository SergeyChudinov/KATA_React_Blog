import ReactMarkdown from 'react-markdown'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'

import heart from './heart.svg'
import heartRed from './heart-red.svg'

import './blogItem.scss'

function BlogItem({
  data: {
    author: { username, image },
    body,
    description,
    favoritesCount,
    slug,
    tagList,
    title,
    updatedAt,
  },
  userName,
  favorited,
  handleDeleteTag,
  handleToggleFavorite,
}) {
  const [heartsCount, setHeartsCount] = useState(favoritesCount)

  const handleToggle = () => {
    if (favorited) {
      setHeartsCount((heartsCount) => heartsCount - 1)
    } else {
      setHeartsCount((heartsCount) => heartsCount + 1)
    }
    handleToggleFavorite()
  }

  const blogList = tagList.map((tag, i) => {
    return (
      <li key={i} className="blogItem__tagList_list-item">
        {tag}
      </li>
    )
  })

  const formattedDate = format(new Date(updatedAt), 'MMMM d, yyyy')

  const btns = (
    <div className="blogItem__groupButton">
      <button className="blogItem__btn blogItem__delete" onClick={handleDeleteTag}>
        Delete
      </button>
      <Link className="blogItem__btn blogItem__edit" to={`/edit-article/${slug}`}>
        Edit
      </Link>
    </div>
  )

  const img = favorited ? heartRed : heart

  const section = (
    <section className="blogItem">
      <div className="blogItem__container">
        <div className="blogItem__block">
          <h2 className="blogItem__title">{title}</h2>
          <img className="blogItem__heart" src={img} alt="heart" onClick={handleToggle} />
          <span className="blogItem__favorited">{heartsCount}</span>
        </div>
        <div className="blogItem__tagList">
          <ul className="blogItem__tagList_list">{blogList}</ul>
        </div>
        <p className="blogItem__description">{description}</p>
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
      {userName === username ? btns : null}
    </section>
  )

  return <>{section}</>
}

export default BlogItem
