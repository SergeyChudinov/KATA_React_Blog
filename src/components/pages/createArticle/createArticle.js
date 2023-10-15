import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Redirect, useParams } from 'react-router-dom'

import BlogService from '../../../services/blog-services'
import Article from '../article/article'

import './createArticle.scss'

const CreateArticle = ({ dataType }) => {
  const [tags, setTags] = useState([])
  const { id } = useParams()
  const token = localStorage.getItem('token')
  const isLoggedIn = token ? true : false

  const onSubmitCreate = (data) => {
    const blogService = new BlogService()

    const article = {
      article: {
        body: data.body,
        description: data.description,
        tagList: tags.filter((tag) => tag.replace(/\s/g, '') !== ''),
        title: data.title,
      },
    }

    const json = JSON.stringify(article)
    blogService.createArticle(json, token).then((res) => console.log(res))
  }

  const onSubmitEdit = (data) => {
    const blogService = new BlogService()

    const article = {
      article: {
        body: data.body,
        description: data.description,
        tagList: tags.filter((tag) => tag.replace(/\s/g, '') !== ''),
        title: data.title,
      },
    }

    const json = JSON.stringify(article)
    console.log(json)
    blogService.updateArticle(json, token, id).then((res) => console.log(res))
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
  // console.log(isLoggedIn)

  if (dataType === 'new-article') {
    return (
      <>
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
    console.log(id)
    return (
      <>
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
