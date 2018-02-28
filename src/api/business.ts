export default class Business {
  private client: any;

  constructor(wovenClient: any) {
    this.client = wovenClient;
  }

  all(){
    // get list of all businesses
    return this.client.request({
      url:'/business/'
    })
  }

  get(businessId: string){
    // get specific business
    return this.client.request({
      url: `/business/${businessId}/`     
    })
  }

  edit(businessId: string, payload: object){
    // update business
    return this.client.request({
      url: `/business/${businessId}/`,
      method: 'PUT',
      body: JSON.stringify(payload)
    })
  }

  delete(businessId: string){
    // delete a business
    return this.client.request({
      url: `/business/${businessId}/`,
      method: 'DELETE',
    })
  }
}