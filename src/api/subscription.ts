export default class Subscription {
  private client: any;

  constructor(wovenClient: any) {
    this.client = wovenClient;
  }

  create(payload: any) {
    return this.client.request({
      url: `/subscriptions/`,
      method: 'POST',
      body: JSON.stringify(payload)
    })
  }

  edit(subscriptionId: string, payload: any) {
    return this.client.request({
      url: `/subscriptions/${subscriptionId}/`,
      method: 'PATCH',
      body: JSON.stringify(payload)
    })
  }

  delete(subscriptionId: string) {
    return this.client.request({
      url: `/subscriptions/${subscriptionId}/`,
      method: 'DELETE',
    })
  }

  all(){
    // Retrieve all subscription
    return this.client.request({
      url: `/subscriptions/`,
    })
  }
  
  get(subscriptionId: string) {
    // Retrieve specified subscription
    return this.client.request({
      url: `/subscriptions/${subscriptionId}/`,
    })
  }
}
