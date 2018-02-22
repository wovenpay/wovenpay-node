export default class Customer {
    private url = '/customers';
    private client: any;
  
    constructor(wovenClient: any) {
      this.client = wovenClient;
    }
  
    create(payload: any) {
      return fetch(`${this.client.url}${this.url}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.client.token}`
        },
        body: JSON.stringify(payload)
      })
    }

    edit(customerId: string, payload: any) {
      return fetch(`${this.client.url}${this.url}/${customerId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.client.token}`
        },
        body: JSON.stringify(payload)
      })
    }
  
    delete(customerId: string) {
      return fetch(`${this.client.url}${this.url}/${customerId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.client.token}`
        }
      })
    }
  }
  