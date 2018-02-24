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
  - Payments

### To Be Added  
  - Account Resource [GET and PUT only]
  - Business Resource [GET and PUT only]
  - Plan Resource [GET]
  - Webhook Resource [GET]
  - Subscriptions Resource
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
## To add Token
```javaScript
let response = await wovenpay.getAuthToken(merchantEmail: string, merchantPassword: string);
data = await response.json();

let token = data.token;
wovenpay.token = token;
```

## To add request timeout
```javaScript
wovenpay.timeout = 5000 //5 seconds max
```

## To add api version
```javaScript
wovenpay.version = "1" //Every request will use version 1 of wovenpay api
```
## To get Token
```javaScript
let response = await wovenpay.getAuthToken(merchantEmail: string, merchantPassword: string)
token = await response.json();
```

## To refresh Token
```javaScript
let response = await wovenpay.refreshAuthToken(token: string)
token = await response.json();
```
## To verify Token
```javaScript
let response = await wovenpay.verifyAuthToken(token: string)
is_valid = await response.json();
```


## Customer
### To Create a new customer
wovenpay.Customers.create(json payload)
```javaScript
let response = await wovenpay.Customers.create({email: email});
customer = await response.json();
```

### To Edit a customer
wovenpay.Customers.edit(customer id, json payload)
```javaScript
let response = wovenpay.Customers.edit(customer.id, {email: email});
customer = await response.json();
```

### To Delete a customer
wovenpay.Customers.delete(customer id)
```javaScript
let response = wovenpay.Customers.delete(customer.id);
customer = await response.json();
```

### Retrieve all customers
wovenpay.Customers.all()
```javaScript
let response = wovenpay.Customers.all();
customers = await response.json();
```

### Retrieve Specific customer
wovenpay.Customers.get(customer id)
```javaScript
let response = wovenpay.Customers.get(customer.id);
customer = await response.json();
```

## Plan
### To Create a new plan
wovenpay.Plans.create(json payload)
```javaScript
let response = await wovenpay.Plans.create({name:planName, business: Business, price:1000});
plan = await response.json();
```

### To Edit a plan
wovenpay.Plans.edit(plan id, json payload)
```javaScript
let response = wovenpay.Plans.create({name:planName, business: Business, price:2000});
plan = await response.json();
```

### To Delete a plan
wovenpay.Plans.delete(plan id)
```javaScript
let response = wovenpay.Plans.delete(plan.id);
plan = await response.json();
```


## Payments
### To Create a new Payments Charge
wovenpay.Payments.charge(json payload)
```json
payload = {
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
```
```javaScript
let response = await wovenpay.Payments.charge(payload);
charge = await response.json();
```

### Get list of Payment transactions
*You should probably want to use graphql query*
wovenpay.Payments.transactions()
```javaScript
let response = wovenpay.Payments.transactions();
transactions = await response.json();
```

### To Transaction Status
wovenpay.Payments.status(transaction id)
```javaScript
let response = wovenpay.Payments.status(transaction.id);
status = await response.json();
```


## Webhook
### To Create a new webhook
wovenpay.Webhooks.create(json payload)
```javaScript
let response = await wovenpay.Webhooks.create({event: event, target:url, key:"notsecretkey"});
hook = await response.json();
```

### To Edit a webhook
wovenpay.Webhooks.edit(hook id, json payload)
```javaScript
let response = wovenpay.Webhooks.create({event:"customer.created", target: url, key:"secretkey"});
hook = await response.json();
```

### To Delete a webhook
wovenpay.Webhooks.delete(hook id)
```javaScript
let response = wovenpay.Webhooks.delete(hook.id);
hook = await response.json();
```

## GraphQl Query
### Query Graph
One can use both string or template literals
wovenpay.Graph.query(json payload)
```javaScript
let response = await wovenpay.Graph.query(`{ allBusinesses {edges{node{id name }}} }`)
let response2 = await wovenpay.Graph.query`{ allBusinesses {edges{node{id name }}} }`
```
