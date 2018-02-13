export default class WovenPay {
  private url: string

  constructor(url: string) {
    this.url = url
  }

  async getAuthToken(email: string, password: string) {
    let authToken = await fetch(this.url, {
      method: 'POST',
      body: JSON.stringify({ email: email, password: password })
    }).catch(e => { return e })
    return authToken
  }
}
