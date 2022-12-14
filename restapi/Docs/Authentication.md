# Authentication

- [Authentication](#authentication)
  - [Register](#register)
    - [Register Request](#register-request)
  - [Login](#login)
    - [Login Request](#login-request)

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
