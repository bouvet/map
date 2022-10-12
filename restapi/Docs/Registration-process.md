# Registration Process

The first thing the user will do is entering their email. A request is then sent to the backend creating an Email entity with a confirmation code.
The user will then receive an email from the system with the confirmation code. They will then have to enter that code to confirm their email.

Once all digits are entered a new request will be sent to the server confirming the code. User email will then be confirmed and the user can proceed with entering their
name, date of birth and password.

## Create Email

### Create Email Request

```js
POST {{host}}/api/email
Content-Type: application/json
```

```yml
Required fields:
  - email
```

```json
{
  "email": ""
}
```

### Create Email Response

```js
200 Ok
```

```json
{
  "id": "",
  "address": "",
  "token": ""
}
```

## 🔒Confirm Email

### Confirm Email Request

```js
POST {{host}}/api/email/confirm
Content-Type: application/json
Authorization: Bearer {{token}}
```

```yml
Required fields:
  - email
  - confirmationCode
```

```json
{
  "email": "",
  "confirmationCode": 0
}
```

### Confirm Email Response

```js
200 Ok
```

```json
{
  "id": "",
  "address": "",
  "confirmationCode": 0,
  "confirmed": true,
  "created": "",
  "updated": ""
}
```

> If a user enters wrong email, they can go back.
> This will result in deleting created email.
> Only Admin or the user who tried to register can delete.

## 🔒Delete Email

### Delete Email Request

```js
DELETE {{host}}/api/email/{{email}}
Content-Type: application/json
Authorization: Bearer {{token}}
```

### Delete Email Response

```js
204 No Content
```

## 🔒Get Emails

### Get Emails Request

```js
GET {{host}}/api/email
Authorization: Bearer {{admintoken}}
```

### Get Emails Response

```js
200 Ok
```

```json
[
  {
    "id": "",
    "address": "",
    "confirmationCode": 0,
    "confirmed": false,
    "created": "",
    "updated": null or ""
  }
]
```
