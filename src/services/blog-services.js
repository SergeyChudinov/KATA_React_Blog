export default class BlogService {
  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  }

  url = 'https://blog.kata.academy/api/'
  limit = 10

  async getResource(url) {
    const res = await fetch(url, this.options)
    if (!res.ok) {
      throw new Error(`Could not fetch ${url} , status: ${res.status}`)
    }
    return await res.json()
  }

  async getArticles(offset) {
    const res = await this.getResource(`${this.url}/articles/?limit=${this.limit}&offset=${offset}`)
    console.log(res)
    return res
  }

  async getSlug(id) {
    const res = await this.getResource(`${this.url}/articles/${id}`)
    // console.log(res.article)
    return res.article
  }
}
