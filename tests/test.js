import chai from 'chai';
import Woven from '../built';
import SpiedWoven, {JWTResourceResponse} from './utils';

const expect = chai.expect;

function randomString(length){
  let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let string = "";
  for(var i=0; i <= length; i++) {
    string += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  return string;
}


function randomURL(){  
  return "https://"+randomString(7)+".wovennpay.com/"
}

let testBusiness = "bus_B6cDFj4uTz4AuFAUFzPFgm";
let testCustomer = "cus_BBmafrJiRgTJaVh5aenwLm";
let testPlan = "plan_jpcms2jwkvHbinJHvHygkZ";

const testIPAddress = randomURL();


describe('Test Woven Object', () => {
  let wovenpay = SpiedWoven();
   
  it('Should have Customers resource', () => {
    expect(wovenpay).to.have.property('Customers');
  }).timeout(0)

  it('Should have Graph resource', () => {
    expect(wovenpay).to.have.property('Graph');
  }).timeout(0)

  it('Should have Plans resource', () => {
    expect(wovenpay).to.have.property('Plans');
  }).timeout(0)

  it('Should have Payments resource', () => {
    expect(wovenpay).to.have.property('Payments');
  }).timeout(0)
  
  it('Should have Subscriptions resource', () => {
    expect(wovenpay).to.have.property('Subscriptions');
  }).timeout(0)
  
  it('Should have Webhooks resource', () => {
    expect(wovenpay).to.have.property('Webhooks');
  }).timeout(0)

  it('Should have prop token', () => {
    expect(wovenpay).to.have.property('token');
  }).timeout(0)

  it('Should have Account resource', () => {
    expect(wovenpay).to.have.property('Account');
  }).timeout(0)

  it('Should have Business resource', () => {
    expect(wovenpay).to.have.property('Business');
  }).timeout(0)
  
  it('Can set and get prop token', () => {
    let tokn = randomString(10);
    wovenpay.token = tokn;
    expect(wovenpay.token).to.equal(tokn);
  }).timeout(0)
})

describe('Test Customer Resource', () => {
  let wovenpay = SpiedWoven();
  
  it('Should create customer', () => {
    let body = {email:"test@test.com"}
    let response = wovenpay.Customers.create(body);
    let endpoint = "customers"
    let expected = JWTResourceResponse(endpoint, body, "POST")
    expect(response).to.deep.equal(expected)
  }).timeout(0)
 
  it('Should edit customer', () => {
    let body = {email:"test@test.com"}
    let response = wovenpay.Customers.edit(1, body);
    let endpoint = "customers/1"
    let expected = JWTResourceResponse(endpoint, body, "PUT")
    expect(response).to.deep.equal(expected)
  }).timeout(0)
  
  it('Should retrieve all customers', () => {
    let response = wovenpay.Customers.all();
    let endpoint = "customers"
    let expected = JWTResourceResponse(endpoint)
    expect(response).to.deep.equal(expected)
  }).timeout(0)

  it('Should get specific customer', () => {
    let response = wovenpay.Customers.get(1);
    let endpoint = "customers/1"
    let expected = JWTResourceResponse(endpoint)
    expect(response).to.deep.equal(expected)
  }).timeout(0)

  it('Should delete customer', () => {
    let response = wovenpay.Customers.delete(1);
    let endpoint = "customers/1"
    let expected = JWTResourceResponse(endpoint, null, "DELETE")
    expect(response).to.deep.equal(expected)
  }).timeout(0)
})

describe('Test Plan Resource', () => {
  let wovenpay = SpiedWoven();
  
  it('Should create Plan', () => {
    let body = {name:"Test "+randomString(3), business: testBusiness, price:1000};
    let response = wovenpay.Plans.create(body);
    let endpoint = "plans"
    let expected = JWTResourceResponse(endpoint, body, "POST")
    expect(response).to.deep.equal(expected)
  }).timeout(0)

  it('Should retrieve all Plans', () => {
    let response = wovenpay.Plans.all();
    let endpoint = "plans";
    let expected = JWTResourceResponse(endpoint);
    expect(response).to.deep.equal(expected);
  }).timeout(0)

  it('Should get specific Plan', () => {
    let response = wovenpay.Plans.get(1);
    let endpoint = "plans/1";
    let expected = JWTResourceResponse(endpoint);
    expect(response).to.deep.equal(expected);
  }).timeout(0)

  it('Should edit Plan', () => {        
    let body = {name:"Test "+randomString(3), business: testBusiness, price:1000}
    let response = wovenpay.Plans.edit(1, body);
    let endpoint = "plans/1";
    let expected = JWTResourceResponse(endpoint, body, "PUT");
    expect(response).to.deep.equal(expected);
  }).timeout(0)
  
  it('Should delete Plan', async () => {
    let response = wovenpay.Plans.delete(1);
    let endpoint = "plans/1";
    let expected = JWTResourceResponse(endpoint, null, "DELETE");
    expect(response).to.deep.equal(expected);
  }).timeout(0)
})


describe('Test Subscription Resource', () => {
  let wovenpay = SpiedWoven();
  
  it('Should retrieve all Subscription', () => {
    let response = wovenpay.Subscriptions.all();
    let endpoint = "subscriptions";
    let expected = JWTResourceResponse(endpoint);
    expect(response).to.deep.equal(expected);
  }).timeout(0);
})

describe('Test Webhook Resource', () => {
  let wovenpay = SpiedWoven();

  it('Should create Webhook',  () => {
    let body = {event:"customer.created", target: randomURL(), key:"test"};
    let response = wovenpay.Webhooks.create(body);
    let endpoint = "webhooks";
    let expected = JWTResourceResponse(endpoint, body, "POST");
    expect(response).to.deep.equal(expected);
  }).timeout(0)

  it('Should edit Webhook', () => {
    let body = {event:"customer.created", target: randomURL(), key:"test"};
    let response = wovenpay.Webhooks.edit(1, body);
    let endpoint = "webhooks/1";
    let expected = JWTResourceResponse(endpoint, body, "PUT");
    expect(response).to.deep.equal(expected);
  }).timeout(0)
  
  it('Should delete Webhook', () => {
    let response = wovenpay.Webhooks.delete(1);
    let endpoint = "webhooks/1";
    let expected = JWTResourceResponse(endpoint, null, "DELETE");
    expect(response).to.deep.equal(expected);
  }).timeout(0)
})

describe('Test Graph Resource', () => {
  let wovenpay = SpiedWoven();
  let endpoint = "graphql";
  let body = {query:'{ allBusinesses {edges{node{id name }}} }'};
  
  it('Should query Graph', () => {
    let response = wovenpay.Graph.query(`{ allBusinesses {edges{node{id name }}} }`);
    let expected = JWTResourceResponse(endpoint, body, "POST");
    expect(response).to.deep.equal(expected);
  }).timeout(0)

  it('Should query Graph: template literal', () => {
    let response = wovenpay.Graph.query`{ allBusinesses {edges{node{id name }}} }`;
    let expected = JWTResourceResponse(endpoint, body, "POST");
    expect(response).to.deep.equal(expected);
  }).timeout(0)
})

describe('Test Account Resource', () => {
  let wovenpay = SpiedWoven();

  it('Should fetch account details', () => {
    let endpoint = "me";
    let response = wovenpay.Account.details();
    let expected = JWTResourceResponse(endpoint);
    expect(response).to.deep.equal(expected);
  }).timeout(0)
})

describe('Test Business Resource', () => {
  let wovenpay = SpiedWoven();
  
  it('Should fetch all businesses', async () => {    
    let response = wovenpay.Business.all()
    let endpoint = "business"
    let expected = JWTResourceResponse(endpoint)
    expect(response).to.deep.equal(expected)
  }).timeout(0)
  
  it('Should edit Business', () => {
    let body = {name:"new business"};
    let response = wovenpay.Business.edit(1, body);
    let endpoint = "business/1";
    let expected = JWTResourceResponse(endpoint, body, "PUT");
    expect(response).to.deep.equal(expected);
  }).timeout(0)
  
  it('Should delete Business', () => {
    let response = wovenpay.Business.delete(1);
    let endpoint = "business/1";
    let expected = JWTResourceResponse(endpoint, null, "DELETE");
    expect(response).to.deep.equal(expected);
  }).timeout(0)  
})

describe('Test Fetch', () => {
  let wovenpay = SpiedWoven();
  
  it('Expect fetch function is callable, should fail 401', async () => {
    let woven = new Woven();
    const response = await woven.Customers.all();
    expect(response.status).to.equal(401)
  }).timeout(0)
})
