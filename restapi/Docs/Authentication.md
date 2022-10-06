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

### Register Response

```js
200 OK
```

```json
{
  "id": "",
  "email": "",
  "firstName": "",
  "lastName": "",
  "address": null,
  "postalArea": null,
  "postalCode": 0,
  "phoneNumber": 0,
  "dob": "",
  "roles": [
    {
      "id": "",
      "name": "",
      "created": "",
      "updated": null,
      "creator": null,
      "editor": null
    }
  ],
  "favoriteCategories": [
    {
      "id": "",
      "name": "",
      "emoji": "",
      "creator": null,
      "editor": null
    },
    {
      "id": "",
      "name": "",
      "emoji": "",
      "creator": null,
      "editor": null
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
  "dob": null,
  "roles": [
    {
      "id": "",
      "name": "",
      "created": "",
      "updated": null,
      "creator": {
        "id": "",
        "email": "",
        "firstName": null,
        "lastName": null
      },
      "editor": null // Same as creator if any, else null
    }
  ],
  "token": ""
}
```
