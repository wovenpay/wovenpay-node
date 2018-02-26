export default class Plan {
    private client: any;
  
    constructor(wovenClient: any) {
      this.client = wovenClient;
    }
  
    create(payload: any) {
      return this.client.request({
        url: `/plans/`,
        method: 'POST',
        body: JSON.stringify(payload)
      })
    }
  
    edit(planId: string, payload: any) {
      return this.client.request({
        url: `/plans/${planId}/`,
        method: 'PUT',
        body: JSON.stringify(payload)
      })
    }

    delete(planId: string) {
      return this.client.request({
        url: `/plans/${planId}/`,
        method: 'DELETE',
      })
    }

    all(){
      // Retrieve all plans
      return this.client.request({
        url: `/plans/`,
      })
    }
    
    get(planId: string) {
      // Retrieve specified plan
      return this.client.request({
        url: `/plans/${planId}/`,
      })
    }

  }
