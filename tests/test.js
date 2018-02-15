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

describe('WovenPay', () => {
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

  it('Charge payment (Without token)', async () => {
    let wovenPay = new WovenPay(url, apikey, apisecret)
    let chargePayment = await wovenPay.chargePayment('mobile.mpesa', 200, '254727383066', 'email@sample.com', 'desc', 'ref')
    expect(chargePayment.status).to.be.equal(200)
  }).timeout(0)
})
