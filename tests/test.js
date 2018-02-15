import chai from 'chai'
import WovenPay from '../built/index'
import request from 'supertest'

const expect = chai.expect
const url = 'http://sandbox.wovenpay.com'
const apikey = "ak_uCuLfshe4WR3AcdAT75cGJ"
const apisecret = "sk_L6bdGXvm33phgstQ8bKwjJ"
const pubkey = "pk_TPUMe9vcckTFuzQ8HJgaPE"
const email = "jk@test.com"
const password = "test12345"
const wrongPassword = "test123451"

describe('WovenPay JS SDK', () => {
  it('Initialize WovenPay object', () => {
    let wovenPay = new WovenPay(url, apikey, apisecret)
    expect(wovenPay).to.be.an.instanceof(WovenPay)
  })

  it('Get auth token (Correct password)', async () => {
    let wovenPay = new WovenPay(url, apikey, apisecret)
    let token = await wovenPay.getAuthToken(email, password)
    expect(token.status).to.be.equal(200)
  })

  it('Get auth token (Wrong password)', async () => {
    let wovenPay = new WovenPay(url, apikey, apisecret)
    let token = await wovenPay.getAuthToken(email, wrongPassword)
    expect(token.status).to.be.equal(400)
  })

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

  it('Check payments status: Expect to fail', async () => {
    let wovenPay = new WovenPay(url, apikey, apisecret)
    let chargePayment = await wovenPay.chargePayment('mobile.mpesa', 200, '254727383066', 'email@sample.com', 'desc', 'ref')
    let json = await chargePayment.json()
    let response = await wovenPay.checkPaymentStatus(json.transaction_id)
    expect(response.status).to.be.equal(400)
  }).timeout(0)

  it('Create webhook', async () => {
    let wovenPay = new WovenPay(url, apikey, apisecret)
    let token = await wovenPay.getAuthToken(email, password)
    let jsonToken = await token.json()
    wovenPay.setAuthToken(jsonToken.token)
    let response = await wovenPay.createWebhook('customer.created', 'https://127.0.0.1:67014/', 'test')
    let responseJson = await response.json()
    expect(response.status).to.be.equal(201)
  }).timeout(0)

  it('Delete webhook', async () => {
    let wovenPay = new WovenPay(url, apikey, apisecret)
    let token = await wovenPay.getAuthToken(email, password)
    let jsonToken = await token.json()
    wovenPay.setAuthToken(jsonToken.token)
    let response = await wovenPay.createWebhook('customer.created', 'https://127.0.0.1:67025/', 'test')
    let responseJson = await response.json()
    let response2 = await wovenPay.deleteWebhook(responseJson.id)
    expect(response2.status).to.be.equal(204)
  }).timeout(0)

  it('Create plan', async () => {
    let wovenPay = new WovenPay(url, apikey, apisecret)
    let token = await wovenPay.getAuthToken(email, password)
    let jsonToken = await token.json()
    wovenPay.setAuthToken(jsonToken.token)
    let response = await wovenPay.createPlan('customerpp', 200, 'bus_nRYFanSePwq5pHP4n5Nza3')
    expect(response.status).to.be.equal(201)
  }).timeout(0)

  it('Edit plan name', async () => {
    let wovenPay = new WovenPay(url, apikey, apisecret)
    let token = await wovenPay.getAuthToken(email, password)
    let jsonToken = await token.json()
    wovenPay.setAuthToken(jsonToken.token)
    let response = await wovenPay.createPlan('customeroo', 200, 'bus_nRYFanSePwq5pHP4n5Nza3')
    let jsonResponse = await response.json()
    let response2 = await wovenPay.editPlanName(jsonResponse.id, 'customer9')
    expect(response2.status).to.be.equal(200)
  }).timeout(0)

  it('Edit plan fully', async () => {
    let wovenPay = new WovenPay(url, apikey, apisecret)
    let token = await wovenPay.getAuthToken(email, password)
    let jsonToken = await token.json()
    wovenPay.setAuthToken(jsonToken.token)
    let response = await wovenPay.createPlan('cuhffg', 200, 'bus_nRYFanSePwq5pHP4n5Nza3')
    let jsonResponse = await response.json()
    console.log(JSON.stringify(jsonResponse))
    let response2 = await wovenPay.editPlan(jsonResponse.id, 'PNsahm5', 400, 'bus_nRYFanSePwq5pHP4n5Nza3')
    console.log(JSON.stringify(await response2.json()))
    expect(response2.status).to.be.equal(200)
  }).timeout(0)

  it('Delete plan', async () => {
    let wovenPay = new WovenPay(url, apikey, apisecret)
    let token = await wovenPay.getAuthToken(email, password)
    let jsonToken = await token.json()
    wovenPay.setAuthToken(jsonToken.token)
    let response = await wovenPay.createPlan('customercc', 200, 'bus_nRYFanSePwq5pHP4n5Nza3')
    let jsonResponse = await response.json()
    let response2 = await wovenPay.deletePlan(jsonResponse.id)
    expect(response2.status).to.be.equal(204)
  }).timeout(0)
})
