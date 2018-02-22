export default class Webhook {
    private url = '/webhooks';
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
    
    edit(hookId: string, payload: any) {
      return fetch(`${this.client.url}${this.url}/${hookId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.client.token}`
        },
        body: JSON.stringify(payload)
      })
    }
    
    delete(hookId: string) {
      return fetch(`${this.client.url}${this.url}/${hookId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${this.client.token}`
        }
      })
    }
  }
  