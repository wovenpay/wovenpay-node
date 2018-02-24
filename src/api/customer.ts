export default class Customer {
    private client: any;
  
    constructor(wovenClient: any) {
      this.client = wovenClient;
    }
  
    create(payload: any) {
      // Create a new customer
      return this.client.request({
        url: `/customers/`,
        method: 'POST',
        body: JSON.stringify(payload)
      })
    }

    edit(customerId: string, payload: any) {
      // Edit specified customer's details
      return this.client.request({
        url: `/customers/${customerId}/`,
        method: 'PUT',
        body: JSON.stringify(payload)
      })
    }
    
    delete(customerId: string) {
      // Delete specified customers
      return this.client.request({
        url: `/customers/${customerId}/`,
        method: 'DELETE',
      })
    }

    all(){
      // Retrieve all customers
      return this.client.request({
        url: `/customers/`,
      })
    }
    
    get(customerId: string) {
      // Retrieve specified customer
      return this.client.request({
        url: `/customers/${customerId}/`,
      })
    }
  }
  