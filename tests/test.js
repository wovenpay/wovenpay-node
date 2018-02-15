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

describe('WovenPay', () => {
  it('initialize WovenPay object', () => {
    let wovenPay = new WovenPay(url)
    expect(wovenPay).to.be.an.instanceof(WovenPay)
  })

  it('Get auth token', async () => {
    let wovenPay = new WovenPay(url)
    let token = await wovenPay.getAuthToken(email, password)
    expect(token.status).to.be.equal(200)
  })
})
