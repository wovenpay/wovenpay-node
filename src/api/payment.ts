export default class Payment {
    private url = '/payments';
    private actionUrl: string = this.url+'/actions';
    private client: any;
    
    constructor(wovenClient: any) {
      this.client = wovenClient;
    }
  
    charge(payload: any) {
      return fetch(`${this.client.url}${this.actionUrl}/charge`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'XPAY': `${this.client.apikey}:${this.client.apisecret}`,
        },
        body: JSON.stringify(payload)
      })
    }
  
    transactions() {
      return fetch(`${this.client.url}${this.url}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'XPAY': `${this.client.apikey}:${this.client.apisecret}`,
        }
      })
    }

    status(transactionId: string) {
      return fetch(`${this.client.url}${this.actionUrl}/${transactionId}/status`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'XPAY': `${this.client.apikey}:${this.client.apisecret}`,
        }
      })
    }
  }
  