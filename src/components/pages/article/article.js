import { useForm } from 'react-hook-form'
import { Redirect } from 'react-router-dom'

import './article.scss'

const Article = ({ title, isLoggedIn, onSubmit, tags, handleAddTag, handleDeleteTag, handleTagChange }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <div className="article">
      {!isLoggedIn && <Redirect to="/sign-in" />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="article__title">{title}</h1>

        <label className="article__label" htmlFor="title">
          Title
        </label>
        <input
          className="article__input"
          type="text"
          id="title"
          placeholder="Title"
          {...register('title', { required: true })}
        />
        {errors.title && (
          <div>
            <span className="article__span">Поле Title обязательно для заполнения</span>
          </div>
        )}

        <label className="article__label" htmlFor="description">
          Short description
        </label>
        <input
          className="article__input"
          type="text"
          id="description"
          placeholder="Short description"
          {...register('description', { required: true })}
        />
        {errors.title && (
          <div>
            <span className="article__span">Поле Description обязательно для заполнения</span>
          </div>
        )}

        <label className="article__label" htmlFor="description">
          Text
        </label>
        <textarea
          className="article__textarea"
          type="text"
          id="description"
          placeholder="Text"
          {...register('body', { required: true })}
        />
        {errors.title && (
          <div>
            <span className="article__span">Поле Text обязательно для заполнения</span>
          </div>
        )}

        <div>
          {tags.length > 0 && <label className="article__label">Tags</label>}
          {tags.map((tag, i) => (
            <div key={i} className="article__container">
              <input
                className="article__tag"
                type="text"
                placeholder="Tag"
                value={tag}
                onChange={(e) => handleTagChange(i, e.target.value)}
              />
              <button className="article__btn btn__delete" onClick={(e) => handleDeleteTag(e, i)}>
                Delete
              </button>
            </div>
          ))}
        </div>

        <button className="article__btn btn__addTag" onClick={handleAddTag}>
          Add tag
        </button>

        <button className="article__btn btn__submit" type="submit">
          Отправить
        </button>
      </form>
    </div>
  )
}

export default Article
