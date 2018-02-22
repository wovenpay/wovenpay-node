export default class Plan {
    private url = '/plans';
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
  
    edit(planId: string, payload: any) {
      return fetch(`${this.client.url}${this.url}/${planId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.client.token}`
        },
        body: JSON.stringify(payload)
      })
    }

    delete(planId: string) {
      return fetch(`${this.client.url}${this.url}/${planId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${this.client.token}`
        }
      })
    }
  }
