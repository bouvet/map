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
  - password (min 5 chars)
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
  "name": "",
  "address": "",
  "postalArea": "",
  "token": "",
  "postalCode": 0,
  "birthYear": 0
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
  "name": "",
  "address": "",
  "postalArea": "",
  "token": "",
  "postalCode": 0,
  "birthYear": 0
}
```
