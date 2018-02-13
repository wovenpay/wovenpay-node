# WOVEN PAYMENTS JS SDK

# USAGE

## Install
(Not available on npm yet)
```
npm i -S woven-pay-js
```

## Guide

### 1. Initialize the client

```js
import WovenPay from 'woven-pay-js'

let wovenPay = new WovenPay(process.env.REACT_APP_URL)
```

### 2. Authentication

```js
let authToken = wovenPay.getAuthToken(process.env.REACT_APP_SAMPLE_EMAIL, process.env.REACT_APP_SAMPLE_PASSWORD)
```

## API

### 1. new WovenPay(url: string)

### 2. getAuthToken(merchantEmail: string, merchantPassword: string)
