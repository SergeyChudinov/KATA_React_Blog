import ReactMarkdown from 'react-markdown'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { format } from 'date-fns'
import { Button, message, Popconfirm } from 'antd'

import BlogService from '../../services/blog-services'

import heart from './heart.svg'

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
  handleDeleteTag,
}) {
  // const [blogIsDelete, setBlogIsDelete] = useState(false)
  // const token = useSelector((state) => state.user.token)

  // const handleDeleteTag = () => {
  //   const blogService = new BlogService()

  //   blogService.deleteArticle(token, slug).then(() => setBlogIsDelete(true))
  // }
  console.log(slug)
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

  const section = (
    <section className="blogItem">
      <div className="blogItem__container">
        <div className="blogItem__block">
          <h2 className="blogItem__title">{title}</h2>
          <img className="blogItem__heart" src={heart} alt="heart" />
          <span className="blogItem__favorited">{favoritesCount}</span>
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

const confirm = (e) => {
  console.log(e)
  message.success('Click on Yes')
}
const cancel = (e) => {
  console.log(e)
  message.error('Click on No')
}
const App = () => (
  <Popconfirm
    title="Delete the task"
    description="Are you sure to delete this task?"
    onConfirm={confirm}
    onCancel={cancel}
    okText="Yes"
    cancelText="No"
  >
    <Button danger>Delete</Button>
  </Popconfirm>
)
