# Authentication

- [Authentication](#authentication)
  - [Register Request](#register-request)
  - [Register With Google Request](#register-with-google-request)
  - [Login Request](#login-request)
  - [Reset Password Request](#reset-password-request)
  - [Authenticate With Code Request](#authenticate-with-code-request)

## Register Request

```js
POST {{host}}/api/auth/register
Content-Type: application/json
```

```yml
Required fields:
  - email
  - password (min 8 chars)
  - firstName
  - lastName
  - DOB (Date Of Birth)
```

```json
{
  "email": "",
  "password": "",
  "firstName": "",
  "lastName": "",
  "DOB": "", // Format: Year-Month-Day: 2022-09-27
  "favoriteCategoryIds": ["", ""]
}
```

## Register With Google Request

```js
POST {{host}}/api/auth/register-with-google
Content-Type: application/json
```

```yml
Required fields:
  - email
  - password (min 8 chars)
  - firstName
  - lastName
  - DOB (Date Of Birth)
```

```json
{
  "email": "",
  "password": "",
  "firstName": "",
  "lastName": "",
  "DOB": "", // Format: Year-Month-Day: 2022-09-27
  "favoriteCategoryIds": ["", ""]
}
```

## Login Request

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

## Reset Password Request

```js
POST {{host}}/api/auth/reset-password
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

## Authenticate With Code Request

```js
POST {{host}}/api/auth/code
Content-Type: application/json
```

```yml
Required fields:
  - code
```

```json
{
  "code": ""
}
```
