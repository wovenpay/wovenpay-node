export default class Account {
  private client: any;

  constructor(wovenClient: any){
    this.client = wovenClient;
  }

  details(){
    // get account details
    return this.client.request({
      url: '/me/',
    });
  }
}