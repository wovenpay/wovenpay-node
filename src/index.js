let url

const initWovenPay = (url) => {
  this.url = url
  return this
}

const getAuthToken = (email, password) => {
  return fetch(this.url, {
    method: 'POST',
    body: JSON.stringify({ email: email, password: password })
  })
}

export { initWovenPay, getAuthToken }
