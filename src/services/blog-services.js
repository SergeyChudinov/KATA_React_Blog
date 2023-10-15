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
      // console.log(res)
      if (res.status === 422) {
        throw new Error('Неправильный пароль')
      } else if (!res.ok) {
        throw new Error(`Could not fetch ${url} , status: ${res.status}`)
      }
      // console.log(res)
      if (res.status !== 204) {
        return res.json()
      } else {
        return
      }
    } catch (e) {
      if (e.message.includes('отсутствует подключение к сети')) {
        console.log('Ошибка отсутствия сети')
      } else {
        // console.log(url, this.options.method)
        // console.log(e)
        throw e
      }
    }
  }

  async getArticles(offset, token) {
    this.options.headers.Authorization = `Bearer ${token}`
    const res = await this.getResource(`${this.url}/articles/?limit=${this.limit}&offset=${offset}`)
    // console.log(res)
    return res
  }

  async getArticle(id, token) {
    this.options.headers.Authorization = `Bearer ${token}`
    const res = await this.getResource(`${this.url}/articles/${id}`)
    // console.log(res.article)
    return res.article
  }

  async signUp(data) {
    this.options.body = data
    this.options.method = 'POST'
    const res = await this.getResource(`${this.url}/users`)
    // console.log(res)
    return res
  }

  async signIn(data) {
    this.options.body = data
    this.options.method = 'POST'
    const res = await this.getResource(`${this.url}/users/login`)
    // console.log(res)
    return res.user
  }

  async edit(data, token) {
    this.options.body = data
    this.options.method = 'PUT'
    this.options.headers.Authorization = `Bearer ${token}`
    const res = await this.getResource(`${this.url}/user`)
    // console.log(res)
    return res.user
  }

  async createArticle(data, token) {
    this.options.body = data
    this.options.method = 'POST'
    this.options.headers.Authorization = `Bearer ${token}`
    const res = await this.getResource(`${this.url}/articles`)
    // console.log(res)
    return res
  }

  async updateArticle(data, token, slug) {
    console.log(slug, token)
    this.options.body = data
    this.options.method = 'PUT'
    this.options.headers.Authorization = `Bearer ${token}`
    const res = await this.getResource(`${this.url}/articles/${slug}`)
    // console.log(res)
    return res
  }

  async deleteArticle(token, slug) {
    // console.log(slug, token)
    // this.options.body = data
    this.options.method = 'DELETE'
    this.options.headers.Authorization = `Bearer ${token}`
    const res = await this.getResource(`${this.url}/articles/${slug}`)
    // console.log(res)
    // return res
  }
}
