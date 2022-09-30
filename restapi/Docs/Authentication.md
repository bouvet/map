# Authentication

- [Authentication](#authentication)
  - [Register](#register)
    - [Register Request](#register-request)
    - [Register Response](#register-response)
  - [Login](#login)
    - [Login Request](#login-request)
    - [Login Response](#login-response)

## Register

### Register Request

```js
POST {{host}}/api/auth/register
Content-Type: application/json
```

```yml
Required fields:
  - email
  - password (min 8 chars)
```

```json
{
  "email": "",
  "password": ""
}
```

### Register Response

```js
200 OK
```

```json
{
  "id": "",
  "email": "",
  "firstName": null,
  "lastName": null,
  "address": null,
  "postalArea": null,
  "postalCode": 0,
  "phoneNumber": 0,
  "dob": null,
  "roles": [
    {
      "id": "",
      "name": "",
      "created": "",
      "updated": null
    }
  ],
  "token": ""
}
```

## Login

### Login Request

```js
POST {{host}}/api/auth/login
Content-Type: application/json
```

```yml
Required fields:
  - email
  - password
```

```json
{
  "email": "",
  "password": ""
}
```

### Login Response

```js
200 OK
```

```json
{
  "id": "",
  "email": "",
  "firstName": "",
  "lastName": "",
  "address": "",
  "postalArea": "",
  "postalCode": 0,
  "phoneNumber": 0,
  "dob": "",
  "roles": [
    {
      "id": "",
      "name": "",
      "created": "",
      "updated": null
    }
  ],
  "token": ""
}
```
