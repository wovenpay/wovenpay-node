import chai from 'chai';
import WovenPay from '../built/index';
import request from 'supertest';

function randomString(length){
  let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let string = "";
  for(var i=0; i <= length; i++) {
    string += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  return string;
}

function randomIPAddress(){
  let port = Math.floor(8000 + Math.random() * 12000);
  return "https://"+randomString(7)+".wovennpay.com/"+ port.toString();
}

const expect = chai.expect
const url = 'http://sandbox.wovenpay.com';

const apikey = "ak_7zeqY5qGVhPLTMKKyb3vwF";
const apisecret = "sk_q6segivqhA3xxNPn2KkWbP";
const email = "test@test.com";
const password = "test12345";
const wrongPassword = "test123451";
const testToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiYWNjX2JrVVJrNGI2MnE2WGJXaE5DZWphUjMiLCJ1c2VybmFtZSI6InRlc3RAdGVzdC5jb20iLCJleHAiOjE1MTk1MTg3OTUsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsIm9yaWdfaWF0IjoxNTE5NDc1NTk1fQ.A5kyfQDeLz8AgH7SfrzNqtgclx4d0XYpOqRWplHvCRc"
let testBusiness = "bus_B6cDFj4uTz4AuFAUFzPFgm";

const testIPAddress = randomIPAddress();


describe('Test Woven Object', () => {
  it('Should initialize WovenPay object', () => {
    let wovenpay = new WovenPay(url, apikey, apisecret);
    expect(wovenpay).to.be.an.instanceof(WovenPay);
  }).timeout(0)

  it('Should have Customers resource', () => {
    let wovenpay = new WovenPay(url, apikey, apisecret);
    expect(wovenpay).to.have.property('Customers');
  }).timeout(0)

  it('Should have Graph resource', () => {
    let wovenpay = new WovenPay(url, apikey, apisecret);
    expect(wovenpay).to.have.property('Graph');
  }).timeout(0)

  it('Should have Plans resource', () => {
    let wovenpay = new WovenPay(url, apikey, apisecret);
    expect(wovenpay).to.have.property('Plans');
  }).timeout(0)

  it('Should have Payments resource', () => {
    let wovenpay = new WovenPay(url, apikey, apisecret);
    expect(wovenpay).to.have.property('Payments');
  }).timeout(0)
  
  it('Should have Webhooks resource', () => {
    let wovenpay = new WovenPay(url, apikey, apisecret);
    expect(wovenpay).to.have.property('Webhooks');
  }).timeout(0)


  it('Should have prop token', () => {
    let wovenpay = new WovenPay(url, apikey, apisecret);
    expect(wovenpay).to.have.property('token');
  }).timeout(0)
  
  it('Can set and get prop token', () => {
    let wovenpay = new WovenPay(url, apikey, apisecret);
    let tokn = randomString(10);
    wovenpay.token = tokn;
    expect(wovenpay.token).to.equal(tokn);
  }).timeout(0)
})

describe('Test Customer Resource', () => {
  let wovenpay = new WovenPay(url, apikey, apisecret);
  wovenpay.token = testToken;
  let customer = null;
  
  it('Should create customer', async () => {
    let response = await wovenpay.Customers.create({email:randomString(6)+"@gmail.com"});
    customer = await response.json();
    expect(response.status).to.be.equal(201);
  }).timeout(0)
 
  it('Should edit customer', async () => {
    let response = await wovenpay.Customers.edit(customer.id, {email:randomString(4)+"@gmail.com"});
    expect(response.status).to.be.equal(200);
  }).timeout(0)
  
  it('Should retrieve all customers', async () => {
    let response = await wovenpay.Customers.all();
    expect(response.status).to.be.equal(200);
  }).timeout(0)

  it('Should get specific customer', async () => {
    let response = await wovenpay.Customers.get(customer.id);
    expect(response.status).to.be.equal(200);
  }).timeout(0)

  it('Should delete customer', async () => {
    let response = await wovenpay.Customers.delete(customer.id);
    expect(response.status).to.be.equal(204);
  }).timeout(0)
})

describe('Test Plan Resource', () => {
  let wovenpay = new WovenPay(url, apikey, apisecret);
  wovenpay.token = testToken;
  let plan = null;
  
  it('Should create Plan', async () => {
    let response = await wovenpay.Plans.create({name:"Test "+randomString(3), business: testBusiness, price:1000});
    plan = await response.json();
    expect(response.status).to.be.equal(201);
  }).timeout(0)

  it('Should edit Plan', async () => {        
    let response = await wovenpay.Plans.edit(plan.id, {name:"Test "+randomString(3), business: testBusiness, price:1000});
    expect(response.status).to.be.equal(200);
  }).timeout(0)
  
  it('Should delete Plan', async () => {
    let response = await wovenpay.Plans.delete(plan.id);
    expect(response.status).to.be.equal(204);
  }).timeout(0)
})

describe('Test Webhook Resource', () => {
  let wovenpay = new WovenPay(url, apikey, apisecret);
  wovenpay.token = testToken;
  let hook = null;

  it('Should create Webhook', async () => {
    let response = await wovenpay.Webhooks.create({event:"customer.created", target: randomIPAddress(), key:"test"});
    hook = await response.json();
    expect(response.status).to.be.equal(201);
  }).timeout(0)

  it('Should edit Webhook', async () => {
    let response = await wovenpay.Webhooks.edit(hook.id, {event:"customer.created", target: randomIPAddress(), key:"test"});
    expect(response.status).to.be.equal(200);
  }).timeout(0)
  
  it('Should delete Webhook', async () => {
    let response = await wovenpay.Webhooks.delete(hook.id);
    expect(response.status).to.be.equal(204);
  }).timeout(0)
})

describe('Test Graph Resource', () => {
  let wovenpay = new WovenPay(url, apikey, apisecret);
  wovenpay.token = testToken;
  let hook = null;

  it('Should query Graph', async () => {
    let response = await wovenpay.Graph.query(`{ allBusinesses {edges{node{id name }}} }`)
    let response2 = await wovenpay.Graph.query`{ allBusinesses {edges{node{id name }}} }`
    expect(response.status).to.be.equal(200)
    expect(response2.status).to.be.equal(200)
  }).timeout(0)
})
