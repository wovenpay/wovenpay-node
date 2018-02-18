import chai from 'chai'
import WovenPay from '../built/index'
import request from 'supertest'

function randomString(length){
  let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let string = ""
  for(var i=0; i<=length; i++){
    string += alphabet.charAt(Math.floor(Math.random() * alphabet.length))
  }
  return string;
}

function randomIPAddress(){
  let port = Math.floor(8000 + Math.random() * 12000);
  return "https://"+randomString(7)+".wovennpay.com/"+ port.toString();
}


const expect = chai.expect
const url = 'http://sandbox.wovenpay.com';
const apikey = "ak_uCuLfshe4WR3AcdAT75cGJ";
const apisecret = "sk_L6bdGXvm33phgstQ8bKwjJ";
const pubkey = "pk_TPUMe9vcckTFuzQ8HJgaPE";
const email = "jk@test.com";
const password = "test12345";
const wrongPassword = "test123451";
const testIPAddress = randomIPAddress();

let testBusiness = "bus_nRYFanSePwq5pHP4n5Nza3";

describe('WovenPay JS SDK', () => {
  it('Initialize WovenPay object', () => {
    let wovenPay = new WovenPay(url, apikey, apisecret)
    expect(wovenPay).to.be.an.instanceof(WovenPay)
  }).timeout(0)

  it('Get auth token (Correct password)', async () => {
    let wovenPay = new WovenPay(url, apikey, apisecret)
    let token = await wovenPay.getAuthToken(email, password)
    expect(token.status).to.be.equal(200)
  }).timeout(0)

  it('Get auth token (Wrong password)', async () => {
    let wovenPay = new WovenPay(url, apikey, apisecret)
    let token = await wovenPay.getAuthToken(email, wrongPassword)
    expect(token.status).to.be.equal(400)
  }).timeout(0)

  it('Refresh auth token', async () => {
    let wovenPay = new WovenPay(url, apikey, apisecret)
    let token = await wovenPay.getAuthToken(email, password)
    let json = await token.json()
    let refreshedToken = await wovenPay.refreshAuthToken(json.token)
    expect(refreshedToken.status).to.be.equal(200)
  }).timeout(0)

  it('Verify auth token', async () => {
    let wovenPay = new WovenPay(url, apikey, apisecret)
    let token = await wovenPay.getAuthToken(email, password)
    let json = await token.json()
    let response = await wovenPay.verifyAuthToken(json.token)
    expect(response.status).to.be.equal(200)
  }).timeout(0)

  it('Charge payment', async () => {
    let wovenPay = new WovenPay(url, apikey, apisecret)
    let chargePayment = await wovenPay.chargePayment('mobile.mpesa', 200, '254727383066', 'email@sample.com', 'desc', 'ref')
    expect(chargePayment.status).to.be.equal(200)
  }).timeout(0)

  it('Check payments status: Expect pending status', async () => {
    let wovenPay = new WovenPay(url, apikey, apisecret)
    let chargePayment = await wovenPay.chargePayment('mobile.mpesa', 200, '254727383066', 'email@sample.com', 'desc', 'ref')
    let json = await chargePayment.json()
    let response = await wovenPay.checkPaymentStatus(json.transaction_id)    
    expect(response.status).to.be.equal(200)
  }).timeout(0)

  it('Create webhook', async () => {
    let wovenPay = new WovenPay(url, apikey, apisecret)
    let token = await wovenPay.getAuthToken(email, password)
    let jsonToken = await token.json()
    wovenPay.setAuthToken(jsonToken.token)
    let response = await wovenPay.createWebhook('customer.created', testIPAddress, 'test')
    let responseJson = await response.json()
    expect(response.status).to.be.equal(201)
  }).timeout(0)

  it('Delete webhook', async () => {
    let wovenPay = new WovenPay(url, apikey, apisecret)
    let token = await wovenPay.getAuthToken(email, password)
    let jsonToken = await token.json()
    wovenPay.setAuthToken(jsonToken.token)
    let response = await wovenPay.createWebhook('customer.created', randomIPAddress(), 'test')
    let responseJson = await response.json()
    let response2 = await wovenPay.deleteWebhook(responseJson.id)
    expect(response2.status).to.be.equal(204)
  }).timeout(0)

  it('Create plan', async () => {
    let wovenPay = new WovenPay(url, apikey, apisecret)
    let token = await wovenPay.getAuthToken(email, password)
    let jsonToken = await token.json()
    wovenPay.setAuthToken(jsonToken.token)
    let response = await wovenPay.createPlan(randomString(8), 200, testBusiness)
    expect(response.status).to.be.equal(201)
  }).timeout(0)

  it('Edit plan name', async () => {
    let wovenPay = new WovenPay(url, apikey, apisecret)
    let token = await wovenPay.getAuthToken(email, password)
    let jsonToken = await token.json()
    wovenPay.setAuthToken(jsonToken.token)
    let response = await wovenPay.createPlan(randomString(8), 200, testBusiness)
    let jsonResponse = await response.json()
    let response2 = await wovenPay.editPlanName(jsonResponse.id, randomString(8))
    expect(response2.status).to.be.equal(200)
  }).timeout(0)

  it('Edit plan fully', async () => {
    let wovenPay = new WovenPay(url, apikey, apisecret)
    let token = await wovenPay.getAuthToken(email, password)
    let jsonToken = await token.json()
    wovenPay.setAuthToken(jsonToken.token)
    let response = await wovenPay.createPlan(randomString(8), 200, testBusiness)
    let jsonResponse = await response.json()    
    let response2 = await wovenPay.editPlan(jsonResponse.id, randomString(8), 400, testBusiness)    
    expect(response2.status).to.be.equal(200)
  }).timeout(0)

  it('Delete plan', async () => {
    let wovenPay = new WovenPay(url, apikey, apisecret)
    let token = await wovenPay.getAuthToken(email, password)
    let jsonToken = await token.json()
    wovenPay.setAuthToken(jsonToken.token)
    let response = await wovenPay.createPlan(randomString(8), 200, testBusiness)
    let jsonResponse = await response.json()
    let response2 = await wovenPay.deletePlan(jsonResponse.id)
    expect(response2.status).to.be.equal(204)
  }).timeout(0)

  it('Should send a graphql query', async () => {
    let wovenpay = new WovenPay(url, apikey, apisecret)
    let token = await wovenpay.getAuthToken(email, password)
    let jsonToken = await token.json()
    wovenpay.setAuthToken(jsonToken.token)
    let response = await wovenpay.query(`{ allBusinesses {edges{node{id name }}} }`)
    let response2 = await wovenpay.query`{ allBusinesses {edges{node{id name }}} }`
    expect(response.status).to.be.equal(200)
    expect(response2.status).to.be.equal(200)
  }).timeout(0)
})
