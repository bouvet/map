# Users🔒

> **All endpoints require Authorization header!**

- [Users🔒](#users)
  - [Get User By Id](#get-user-by-id)
    - [Get User By Id Request](#get-user-by-id-request)
    - [Get User By Id Response](#get-user-by-id-response)
  - [Get Users](#get-users)
    - [Get Users Request](#get-users-request)
    - [Get Users Response](#get-users-response)
  - [Update User](#update-user)
    - [Update User Request](#update-user-request)
    - [Update User Response](#update-user-response)
  - [Add User Role](#add-user-role)
    - [Add User Role Request](#add-user-role-request)
    - [Add User Role Response](#add-user-role-response)
  - [Delete User](#delete-user)
    - [Delete User Request](#delete-user-request)
    - [Delete User Response](#delete-user-response)

## Get User By Id

### Get User By Id Request

```js
GET {{host}}/api/users/{{id}}
Authorization: Bearer {{token}}
```

> User can fetch own details
> Admin has free access

### Get User By Id Response

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
        "firstName": "",
        "lastName": ""
      },
      "editor": null
    }
  ]
}
```

## Get Users

### Get Users Request

```js
GET {{host}}/api/users
Authorization: Bearer {{admintoken}}
```

### Get Users Response

```js
200 OK
```

```json
[
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
        "updated": "",
        "creator": {
          "id": "",
          "email": "",
          "firstName": "",
          "lastName": ""
        },
        "editor": null
      }
    ]
  }
]
```

## Update User

### Update User Request

```js
POST {{host}}/api/users/{{id}}
Content-Type: application/json
Authorization: Bearer {{token}}
```

> User can update their own details
> Admin has free access

```json
{
  "Email": "",
  "FirstName": "",
  "LastName": "",
  "Address": "",
  "PostalArea": "",
  "PostalCode": 0,
  "PhoneNumber": 0,
  "DOB": "" // (DateOfBirth) Format: Year-Month-Day : 2022-09-30
}
```

### Update User Response

```js
204 No Content
```

## Add User Role

### Add User Role Request

```js
POST {{host}}/api/users/role
Content-Type: application/json
Authorization: Bearer {{token}}
```

```json
{
  "UserId": "",
  "RoleId": ""
}
```

### Add User Role Response

```js
204 No Content
```

## Delete User

### Delete User Request

```js
DELETE {{host}}/api/users/{{id}}
Authorization: Bearer {{token}}
```

### Delete User Response

```js
204 No Content
```
