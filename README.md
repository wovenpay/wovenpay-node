# wovenpay JS SDK

__** PLEASE NOTE THAT THIS LIBRARY IS UNDER ACTIVE DEVELOPMENT **__

# USAGE

## Install

```cmd
npm install wovenpay --save
```

### SUPPORTED RESOURCES
  - Customers
  - Payments
  - Plans
  - Webhooks
  - Subscriptions
  - Account Resource [GET and PUT only]
  - Business Resource [GET and PUT only]

### To Be Added
  - Webhook Resource [GET]
  - Payment refund
  - Payment cancel
  - Payment disburse
  - Payment disburse

## Create a new Instance of wovenpay
```javaScript
import WovenPay from 'wovenpay';
let wovenpay = new WovenPay(apikey, apisecret); //Defaults to sandbox api

//To run on live api, pass true to 'live' parameter
let wovenpay = new WovenPay(apikey, apisecret, true);
```
## Add Token
```javaScript
let response = await wovenpay.getAuthToken(merchantEmail: string, merchantPassword: string);
data = await response.json();

let token = data.token;
wovenpay.token = token;
```

## Change Request Timeout
```javaScript
wovenpay.timeout = 5000 //5 seconds max
```

## Change API version
```javaScript
wovenpay.version = "1" //Every request will use version 1 of wovenpay api
```
## Get Token
```javaScript
let response = await wovenpay.getAuthToken(merchantEmail: string, merchantPassword: string)
token = await response.json();
```

## Refresh Token
```javaScript
let response = await wovenpay.refreshAuthToken(token: string)
token = await response.json();
```
## Verify Token
```javaScript
let response = await wovenpay.verifyAuthToken(token: string)
is_valid = await response.json();
```

## Account
#### To get details about an account
```javaScript
  let response = await wovenpay.Account.details();
  details = await response.json()
```

## Businesses/Apps
#### Get all businesses
```js
let response = await wovenpay.Business.all()
businesses = await response.json()
```

#### Get specific business
```js
let response = await wovenpay.Business.get(businessId: string)
business = await response.json()
```

#### Edit a business
```js
let response = await wovenpay.Business.edit(businessId: string, payload: object)
updateResponse = await response.json()
```

#### Delete business
```js
let response = await wovenpay.Business.delete(businessId: string)
deleteResponse = await response.json()
```

## Customer
#### Create a new customer
```javaScript
let response = await wovenpay.Customers.create({email: email});
customer = await response.json();
```

#### Edit a customer
```javaScript
let response = wovenpay.Customers.edit(customer.id, {email: email});
customer = await response.json();
```

#### Delete a customer
```javaScript
let response = wovenpay.Customers.delete(customer.id);
customer = await response.json();
```

#### Retrieve all customers
```javaScript
let response = wovenpay.Customers.all();
customers = await response.json();
```

#### Retrieve Specific customer
```javaScript
let response = wovenpay.Customers.get(customer.id);
customer = await response.json();
```

## Plan
#### Create a new plan
```javaScript
const payload = {
  name: planName,
  business: businessId,
  price: 1000
}
let response = await wovenpay.Plans.create(payload);
plan = await response.json();
```
#### Retrieve all plans
```javaScript
let response = wovenpay.Plans.all();
plans = await response.json();
```
#### Retrieve Specific plan
```javaScript
let response = wovenpay.Plans.get(plan.id);
plans = await response.json();
```
#### Edit a plan
```javaScript
let response = wovenpay.Plans.edit(plan.id, {name:planName, business: Business, price:2000});
plan = await response.json();
```

#### Delete a plan
```javaScript
let response = wovenpay.Plans.delete(plan.id);
plan = await response.json();
```

## Subscription
#### Create a new Subscription
```javaScript
const payload = {
    customer: customerId,
    plan: planId,
    business: businessId,
    period: "month",
    interval: 1
}
let response = await wovenpay.Subscriptions.create(payload);
subscription = await response.json();
```
#### Retrieve Specific Subscription
```javaScript
let response = wovenpay.Subscriptions.get(plan.id);
subscription = await response.json();
```
#### Edit a Subscription
```javaScript
let response = wovenpay.Subscriptions.edit(subscription.id, {interval: 3});
subscription = await response.json();
```

#### Delete a Subscription
```javaScript
let response = wovenpay.Subscriptions.delete(subscription.id);
subscription = await response.json();
```

## Payments
#### Make Payments Charge
```javaScript
const payload = {
  "method": "mobile.mpesa",
  "amount": 10,
  "mobile":phone,
  "customer": {
    "email":test
  },
  "order": {
    "description": "Payment of Dockerfest Ticket"
  },
  "reference": "myuniquereference"
}
let response = await wovenpay.Payments.charge(payload);
charge = await response.json();
```
#### Get list of Payment transactions
*You should probably want to use graphql query*
```javaScript
let response = wovenpay.Payments.transactions();
transactions = await response.json();
```
#### Transaction Status
```javaScript
let response = wovenpay.Payments.status(transaction.id);
status = await response.json();
```

## Webhook
#### Create a new webhook
```javaScript
let response = await wovenpay.Webhooks.create({event: event, target:url, key:"notsecretkey"});
hook = await response.json();
```
#### Edit a webhook
```javaScript
let response = wovenpay.Webhooks.create({event:"customer.created", target: url, key:"secretkey"});
hook = await response.json();
```
#### Delete a webhook
```javaScript
let response = wovenpay.Webhooks.delete(hook.id);
hook = await response.json();
```

## GraphQl Query
#### Query Graph
One can use both string or template literals
```javaScript
let response = await wovenpay.Graph.query(`{ allBusinesses {edges{node{id name }}} }`)
let response2 = await wovenpay.Graph.query`{ allBusinesses {edges{node{id name }}} }`
```
