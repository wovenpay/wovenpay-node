# WOVEN PAYMENTS JS SDK

# USAGE

## Install

```cmd
npm i -S woven-pay-js
```

## API

### 1. new WovenPay(url: string)

### 2. getAuthToken(merchantEmail: string, merchantPassword: string)

### 3. refreshAuthToken(token: string)

### 4. setAuthToken(authToken: string)

### 5. verifyAuthToken(token: string)

### 6. chargePayment(methodOfPayment: string, amount: number, mobile: string, customerEmail: string, orderDescription: string, reference: string)

### 7. checkPaymentStatus(transactionId: string)

### 8. createWebhook(event: string, target: string, key: string)

### 9. deleteWebhook(webhookId: string)

### 10. createPlan(name: string, price: number, business: string)

### 11. editPlanName(planId: string, name: string)

### 12. editPlan(planId: string, name: string, price: number, business: string)

### 13. deletePlan(planId: string)
