export default class WovenPay {
  private url: string
  private authToken: string
  private apikey: string
  private apisecret: string
  private pubkey: string

  constructor(url: string, apikey: string, apisecret: string, pubkey: string) {
    this.url = url
    this.apikey = apikey
    this.apisecret = apisecret
    this.pubkey = pubkey
  }

  getAuthToken(email: string, password: string) {
    return fetch(this.url + '/authorize/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password })
    })
  }

  refreshAuthToken(token: string) {
    return fetch(this.url + '/token/actions/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: token })
    })
  }

  verifyAuthToken(token: string) {
    return fetch(this.url + '/token/actions/verify/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: token })
    })
  }

  setAuthToken(authToken: string) {
    this.authToken = authToken
  }

  chargePayment(methodOfPayment: string, amount: number, mobile: string, customerEmail: string, orderDescription: string, reference: string) {
    return fetch(this.url + '/payments/actions/charge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'XPAY': `${this.apikey}:${this.apisecret}`,
      },
      body: JSON.stringify(
        {
          "method": methodOfPayment,
          "amount": amount,
          "mobile": mobile,
          "customer": {
            "email": customerEmail
          },
          "order": {
            "description": orderDescription
          },
          "reference": reference
        }
      )
    })
  }
}
