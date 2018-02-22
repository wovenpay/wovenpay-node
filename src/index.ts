import Customer from './api/customer';
import GraphQl from './api/graph';
import Plan from './api/plan';
import Payment from './api/payment';
import Webhook from './api/webhook';

let resourceObjects = {
  Customers: Customer,
  Graph: GraphQl,
  Plans: Plan,
  Payments: Payment,
  Webhooks: Webhook
}

export default class WovenPay {
  private _token: string = null;
  
  private url: string;  
  private authToken: string;
  private apikey: string;
  private apisecret: string;
  private pubkey: string;

  constructor(url: string, apikey: string, apisecret: string, pubkey: string) {
    this.url = url;
    this.apikey = apikey;
    this.apisecret = apisecret;
    this.pubkey = pubkey;
    
    for(let resource in resourceObjects){
      this[resource] = new resourceObjects[resource](this);
    }
  }

  get token(){
    return this._token;
  }
  set token(tkn: string){
    this._token = tkn;
  }

  getAuthToken(email: string, password: string) {
    return fetch(this.url + '/authorize/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password })
    })
  }

  refreshAuthToken(token: string) {
    return fetch(this.url + '/token/actions/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: token })
    })
  }

  verifyAuthToken(token: string) {
    return fetch(this.url + '/token/actions/verify/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: token })
    })
  }
}
