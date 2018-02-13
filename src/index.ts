export default class WovenPay {
  private url: string
  private authToken: string

  constructor(url: string) {
    this.url = url
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

  setAuthToken(authToken: string) {
    this.authToken = authToken
  }

  chargePayment(methodOfPayment: string, amount: number, mobile: string, customerEmail: string, orderDescription: string, reference: string) {
    return fetch(this.url + '/payments/actions/charge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
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
