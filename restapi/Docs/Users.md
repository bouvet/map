# 🚧Users

- [🚧Users](#users)
  - [Create User](#create-user)
    - [Create User Request](#create-user-request)
    - [Create User Response](#create-user-response)
  - [Get User](#get-user)
    - [Get User Request](#get-user-request)
    - [Get User Response](#get-user-response)
  - [Update User](#update-user)
    - [Update User Request](#update-user-request)
    - [Update User Response](#update-user-response)
  - [Delete User](#delete-user)
    - [Delete User Request](#delete-user-request)
    - [Delete User Response](#delete-user-response)

## Create User

### Create User Request

```js
POST {{host}}/api/users
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

### Create User Response

```js
201 Created
```

```yml
Location: {{host}}/api/users/{{id}}
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

## Get User

### Get User Request

```js
GET {{host}}/api/users/{{id}}
```

### Get User Response

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

## Update User

### Update User Request

```js
POST {{host}}/api/users/{{id}}
Content-Type: application/json
```

```yml
Required fields:
  - 
```

```json

```

### Update User Response

```js
204 No Content
```

```yml
Location: {{host}}/api/users/{{id}}
```

## Delete User

### Delete User Request

```js
DELETE {{host}}/api/users/{{id}}
```

### Delete User Response

```js
204 No Content
```
