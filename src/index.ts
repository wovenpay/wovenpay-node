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
          'method': methodOfPayment,
          'amount': amount,
          'mobile': mobile,
          'customer': {
            'email': customerEmail
          },
          'order': {
            'description': orderDescription
          },
          'reference': reference
        }
      )
    })
  }

  checkPaymentStatus(transactionId: string) {
    return fetch(this.url + `/payments/${transactionId}/status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'XPAY': `${this.apikey}:${this.apisecret}`,
      }
    })
  }

  createWebhook(event: string, target: string, key: string) {
    return fetch(this.url + `/webhooks/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${this.authToken}`
      },
      body: JSON.stringify(
        {
          'event': event,
          'target': target,
          'key': key
        })
    })
  }

  deleteWebhook(webhookId: string) {
    return fetch(`${this.url}/webhooks/${webhookId}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${this.authToken}`
      }
    })
  }

  createPlan(name: string, price: number, business: string) {
    return fetch(`${this.url}/plans/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${this.authToken}`
      },
      body: JSON.stringify({
        'name': name,
        'price': price,
        'business': business
      })
    })
  }

  editPlanName(planId: string, name: string) {
    return fetch(`${this.url}/plans/${planId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${this.authToken}`
      },
      body: JSON.stringify({
        'name': name,
      })
    })
  }

  editPlan(planId: string, name: string, price: number, business: string) {
    return fetch(`${this.url}/plans/${planId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${this.authToken}`
      },
      body: JSON.stringify({
        'name': name,
        'price': price,
        'business': business
      })
    })
  }

  deletePlan(planId: string) {
    return fetch(`${this.url}/plans/${planId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${this.authToken}`
      }
    })
  }
}
