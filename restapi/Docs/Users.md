# Users

- [Users](#users)
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
```

### Get User By Id Response

```js
200 OK
```

```json
{
  "id": "20b2cb67-df41-49b6-bf2a-3628c136f07d",
  "email": "email56@gmail.com",
  "firstName": null,
  "lastName": null,
  "address": null,
  "postalArea": null,
  "postalCode": 0,
  "phoneNumber": 0,
  "dob": null,
  "roles": [
    {
      "id": "04571743-0a86-45f5-901a-08daa13f9828",
      "name": "User",
      "created": "2022-09-28T12:52:53.390776",
      "updated": null
    }
  ]
}
```

## Get Users

### Get Users Request

```js
GET {{host}}/api/users
```

### Get Users Response

```js
200 OK
```

```json
[
  {
    "id": "20b2cb67-df41-49b6-bf2a-3628c136f07d",
    "email": "email56@gmail.com",
    "firstName": null,
    "lastName": null,
    "address": null,
    "postalArea": null,
    "postalCode": 0,
    "phoneNumber": 0,
    "dob": null,
    "roles": [
      {
        "id": "04571743-0a86-45f5-901a-08daa13f9828",
        "name": "User",
        "created": "2022-09-28T12:52:53.390776",
        "updated": null
      }
    ]
  },
  {
    "id": "b0d82eb1-592a-4a8b-ad59-8c284178764f",
    "email": "email@gmail.com",
    "firstName": null,
    "lastName": null,
    "address": null,
    "postalArea": null,
    "postalCode": 0,
    "phoneNumber": 0,
    "dob": null,
    "roles": [
      {
        "id": "04571743-0a86-45f5-901a-08daa13f9828",
        "name": "User",
        "created": "2022-09-28T12:52:53.390776",
        "updated": null
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
```

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
```

### Delete User Response

```js
204 No Content
```
