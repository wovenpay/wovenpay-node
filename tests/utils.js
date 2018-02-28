import WovenPay from '../built';

export const TOKEN = "1234567890";
export const APIKEY = "apikey";
export const APISECRET = "apisecret";
export const VERSION = "1";

export default function SpiedWoven(){
  // Return a spied wovenpay instance
  const spied = new WovenPay(APIKEY, APISECRET);
  spied.token = TOKEN;
  
  // Replace the default 'request' property with a "spy" function
  // Returns the request options to be used in fetch
  spied.request = function(requestDef){      
      const url = this.url + requestDef.url;
      const _method = (requestDef.method || "GET").toUpperCase();
      const _body = requestDef.body || null;
      
      const authType = requestDef.auth || "JWT";
      const auth = this.getAuthHeader(authType);
      
      const _headers = Object.assign({}, {
                      'Content-Type': 'application/json',
                      'Woven-Api': this.version,
                      }, auth);      
      
      const options = {
        url:url,
        method: _method,
        headers: _headers,
        body: _body      
      }      
      return options;
    }
    return spied;
};

export function JWTResourceResponse(endpoint, body, method){
  return {
    url: `http://sandbox.wovenpay.com/${endpoint}/`,
    method: method || "GET",
    headers: {
      'Content-Type': 'application/json',
      'Woven-Api': VERSION,
      Authorization: `Token ${TOKEN}`
    },
    body: body? JSON.stringify(body) : null
  }
}