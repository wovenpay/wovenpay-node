export default class Webhook {
    private client: any;
    
    constructor(wovenClient: any) {
      this.client = wovenClient;
    }
  
    create(payload: any) {
      return this.client.request({
        url: `/webhooks/`,
        method: 'POST',
        body: JSON.stringify(payload)
      })
    }
    
    edit(hookId: string, payload: any) {
      return this.client.request({
        url: `/webhooks/${hookId}/`,
        method: 'PUT',
        body: JSON.stringify(payload)
      })
    }
    
    delete(hookId: string) {
      return this.client.request({
        url: `/webhooks/${hookId}/`,
        method: 'DELETE'
      })
    }
  }
  