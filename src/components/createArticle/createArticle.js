import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Redirect, useParams } from 'react-router-dom'

import BlogService from '../../services/blog-services'
import Article from '../article/article'

const CreateArticle = ({ dataType }) => {
  const [tags, setTags] = useState([])
  const [createedArticle, setCreateedArticle] = useState(false)
  const { id } = useParams()
  const token = localStorage.getItem('token')
  const isLoggedIn = token ? true : false

  const { createArticle, updateArticle } = BlogService()

  const onSubmitCreate = (data) => {
    const article = {
      article: {
        body: data.body,
        description: data.description,
        tagList: tags.filter((tag) => tag.replace(/\s/g, '') !== ''),
        title: data.title,
      },
    }

    const json = JSON.stringify(article)
    createArticle(json, token)
      .then(() => {
        setCreateedArticle(true)
      })
      .catch((err) => console.log(err))
  }

  const onSubmitEdit = (data) => {
    const article = {
      article: {
        body: data.body,
        description: data.description,
        tagList: tags.filter((tag) => tag.replace(/\s/g, '') !== ''),
        title: data.title,
      },
    }

    const json = JSON.stringify(article)

    updateArticle(json, token, id)
      .then(() => {
        setCreateedArticle(true)
      })
      .catch((err) => console.log(err))
  }

  const handleAddTag = (e) => {
    e.preventDefault()
    setTags([...tags, ''])
  }

  const handleDeleteTag = (e, index) => {
    e.preventDefault()
    setTags((tags) => {
      return tags.filter((_, i) => i !== index)
    })
  }

  const handleTagChange = (index, value) => {
    const newTags = [...tags]
    newTags[index] = value
    setTags(newTags)
  }

  if (dataType === 'new-article') {
    return (
      <>
        {createedArticle && <Redirect to="/" />}
        {!isLoggedIn && <Redirect to="/sign-in" />}
        <Article
          title="Create new article"
          isLoggedIn={isLoggedIn}
          onSubmit={onSubmitCreate}
          tags={tags}
          handleAddTag={handleAddTag}
          handleDeleteTag={handleDeleteTag}
          handleTagChange={handleTagChange}
        />
      </>
    )
  } else {
    return (
      <>
        {createedArticle && <Redirect to="/" />}
        {!isLoggedIn && <Redirect to="/sign-in" />}
        <Article
          title="Edit article"
          isLoggedIn={isLoggedIn}
          onSubmit={onSubmitEdit}
          tags={tags}
          handleAddTag={handleAddTag}
          handleDeleteTag={handleDeleteTag}
          handleTagChange={handleTagChange}
          id={id}
        />
      </>
    )
  }
}

export default CreateArticle
