export default class InstaService {
  constructor(params) {
    this._apiBase = 'http://localhost:3000';
  }

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);
    if(!res.ok) {
      throw new Error(`Could not fetch ${url}; reccieved ${res.status}`);
    }
    return await res.json();
  }

  getAllPosts = async () => {
    return await this.getResource('/posts/');
  }
}