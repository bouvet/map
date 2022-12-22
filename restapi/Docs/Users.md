# Users🔒

> **All endpoints require Authorization header!**

- [Users🔒](#users)
  - [Get User By Id Request](#get-user-by-id-request)
  - [Get Users Request](#get-users-request)
  - [Update User Request](#update-user-request)
  - [Add User Role Request](#add-user-role-request)
  - [Delete User Request](#delete-user-request)
  - [Update Password Request](#update-password-request)
  - [Change Email Request](#change-email-request)
  - [Confirm Email Request](#confirm-email-request)

## Get User By Id Request

```js
GET {{host}}/api/users/{{id}}
Authorization: Bearer {{token}}
```

> User can fetch own details
> Admin has free access

## Get Users Request

```js
GET {{host}}/api/users
Authorization: Bearer {{token}}
```

## Update User Request

```js
POST {{host}}/api/users/{{id}}
Authorization: Bearer {{token}}

Content-Type: multipart/form-data
```

> User can update their own details
> Admin has free access

```multipart/form-data
FirstName = ""
LastName = ""
Address = ""
PostalArea = ""
PostalCode = number
PhoneNumber = number
DeleteProfileImage = boolean
DOB = "" // (DateOfBirth) Format: Year-Month-Day : 2022-09-30
FavoriteCategoryIds = []
ProfileImage = FormFile
```

## Add User Role Request

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

## Delete User Request

```js
DELETE {{host}}/api/users/{{id}}
Authorization: Bearer {{token}}
```

## Update Password Request

```js
PUT {{host}}/api/users/password
Content-Type: application/json
Authorization: Bearer {{token}}
```

```json
{
  "CurrentPassword": "",
  "Password": "",
  "ConfirmPassword": ""
}
```

## Change Email Request

```js
PUT {{host}}/api/users/change-email
Content-Type: application/json
Authorization: Bearer {{token}}
```

```json
{
  "Email": ""
}
```

## Confirm Email Request

```js
PUT {{host}}/api/users/confirm-email
Authorization: Bearer {{token}}
```
