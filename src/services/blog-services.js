export default class BlogService {
  options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }

  url = 'https://blog.kata.academy/api/'
  limit = 10

  async getResource(url) {
    const res = await fetch(url, this.options)
    // console.log(this.options)
    if (!res.ok) {
      throw new Error(`Could not fetch ${url} , status: ${res.status}`)
    }
    return await res.json()
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
    const res = await this.getResource(`${this.url}users`)
    // console.log(res)
    return res
  }

  async signIn(data) {
    this.options.body = data
    this.options.method = 'POST'
    const res = await this.getResource(`${this.url}users/login`)
    // console.log(res)
    return res.user
  }

  async edit(data, token) {
    this.options.body = data
    this.options.method = 'PUT'
    this.options.headers.Authorization = `Bearer ${token}`
    const res = await this.getResource(`${this.url}user`)
    // console.log(res)
    return res.user
  }
}
