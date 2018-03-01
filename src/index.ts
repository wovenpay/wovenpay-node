import Customer from './api/customer';
import GraphQl from './api/graph';
import Plan from './api/plan';
import Payment from './api/payment';
import Subscription from './api/subscription';
import Webhook from './api/webhook';
import Account from './api/account';
import Business from './api/business';

let resourceObjects = {
  Customers: Customer,
  Graph: GraphQl,
  Plans: Plan,
  Payments: Payment,
  Subscriptions: Subscription,
  Webhooks: Webhook,
  Account: Account,
  Business: Business
}

const SANDBOX_URL = "http://sandbox.wovenpay.com";
const LIVE_URL = "https://api.wovenpay.com";

export default class WovenPay {
  private _token: string = null;
  private _version: string = "1";
  
  private url: string;
  private apikey: string;
  private apisecret: string;

  constructor(apikey: string, apisecret: string, live=false) {
    this.url = live? LIVE_URL : SANDBOX_URL ;
    this.apikey = apikey;
    this.apisecret = apisecret;
    
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
  
  set version(vers: string){
    this._version = vers;
  }

  get version(){
    return this._version;
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

  getAuthHeader(authType: string){
    switch(authType.toLowerCase()){
      case "xpay":
        return {'XPAY': `${this.apikey}:${this.apisecret}`}
      case "jwt":
        return {'Authorization': `Token ${this.token}`}
      default:
        return {};
    }
  }
  
  request(requestDef: any) {
    const url = this.url + requestDef.url;
    const _method = (requestDef.method || "GET").toUpperCase();
    const _body = requestDef.body || null;
    
    const authType = requestDef.auth || "JWT";
    const auth = this.getAuthHeader(authType);
    
    const _headers = {
      'Content-Type': 'application/json',
      'Woven-Api': this.version,
      ...auth
    };
    
    const options = {
      method: _method,
      headers: _headers,
      body: _body
    }

    return fetch(url, options);
  }
}