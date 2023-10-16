export default class BlogService {
  options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }

  url = 'https://blog.kata.academy/api'
  limit = 10

  async getResource(url) {
    try {
      const res = await fetch(url, this.options)
      if (res.status === 422) {
        throw new Error('Неправильный пароль')
      } else if (!res.ok) {
        throw new Error(`Could not fetch ${url} , status: ${res.status}`)
      }
      if (res.status !== 204) {
        return res.json()
      } else {
        return
      }
    } catch (e) {
      if (e.message.includes('отсутствует подключение к сети')) {
        throw new Error('Ошибка отсутствия сети')
      } else {
        throw e
      }
    }
  }

  async getArticles(offset, token) {
    this.options.headers.Authorization = `Bearer ${token}`
    const res = await this.getResource(`${this.url}/articles/?limit=${this.limit}&offset=${offset}`)
    return res
  }

  async getArticle(id, token) {
    this.options.headers.Authorization = `Bearer ${token}`
    const res = await this.getResource(`${this.url}/articles/${id}`)
    return res.article
  }

  async signUp(data) {
    this.options.body = data
    this.options.method = 'POST'
    const res = await this.getResource(`${this.url}/users`)
    return res
  }

  async signIn(data) {
    this.options.body = data
    this.options.method = 'POST'
    const res = await this.getResource(`${this.url}/users/login`)
    return res.user
  }

  async edit(data, token) {
    this.options.body = data
    this.options.method = 'PUT'
    this.options.headers.Authorization = `Bearer ${token}`
    const res = await this.getResource(`${this.url}/user`)
    return res.user
  }

  async createArticle(data, token) {
    this.options.body = data
    this.options.method = 'POST'
    this.options.headers.Authorization = `Bearer ${token}`
    const res = await this.getResource(`${this.url}/articles`)
    return res
  }

  async updateArticle(data, token, slug) {
    this.options.body = data
    this.options.method = 'PUT'
    this.options.headers.Authorization = `Bearer ${token}`
    const res = await this.getResource(`${this.url}/articles/${slug}`)
    return res
  }

  async deleteArticle(token, slug) {
    this.options.method = 'DELETE'
    this.options.headers.Authorization = `Bearer ${token}`
    return this.getResource(`${this.url}/articles/${slug}`)
  }

  async favoriteAnArticle(token, slug) {
    this.options.method = 'POST'
    this.options.headers.Authorization = `Bearer ${token}`
    return this.getResource(`${this.url}/articles/${slug}/favorite`)
  }

  async unfavoriteAnArticle(token, slug) {
    this.options.method = 'DELETE'
    this.options.headers.Authorization = `Bearer ${token}`
    return this.getResource(`${this.url}/articles/${slug}/favorite`)
  }
}
