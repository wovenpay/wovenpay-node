export default class Payment {
    private client: any;
    
    constructor(wovenClient: any) {
      this.client = wovenClient;
    }
  
    charge(payload: any) {
      return this.client.request({
        url: `/payments/actions/charge`,
        method: 'POST',
        auth: "XPAY",
        body: JSON.stringify(payload)
      })
    }
  
    transactions() {
      return this.client.request({
        url: `/payments/`,
        auth: "XPAY"
      })
    }

    status(transactionId: string) {
      return this.client.request({
        url: `/payments/${transactionId}/status`,
        auth: "XPAY"
      })
    }
  }
  