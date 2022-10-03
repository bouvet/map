# Roles 🔒

> **All endpoints require Authorization header!**
> **Access level: Administrator**

- [Roles 🔒](#roles-)
  - [Create Role](#create-role)
    - [Create Role Request](#create-role-request)
    - [Create Role Response](#create-role-response)
  - [Get Role By Id](#get-role-by-id)
    - [Get Role By Id Request](#get-role-by-id-request)
    - [Get Role By Id Response](#get-role-by-id-response)
  - [Get Roles](#get-roles)
    - [Get Roles Request](#get-roles-request)
    - [Get Roles Response](#get-roles-response)
  - [Update Role](#update-role)
    - [Update Role Request](#update-role-request)
    - [Update Role Response](#update-role-response)
  - [Delete Role](#delete-role)
    - [Delete Role Request](#delete-role-request)
    - [Delete Role Response](#delete-role-response)

## Create Role

### Create Role Request

```js
POST {{host}}/api/roles
Content-Type: application/json
Authorization: Bearer {{token}}
```

```yml
Required fields:
  - Name
```

```json
{
  "name": "Administrator"
}
```

### Create Role Response

```js
201 Created
```

```yml
Location: {{host}}/api/roles/{{id}}
```

```json
{
  "id": "3d2f83c2-82d4-4e3a-d050-08daa2e6b8a8",
  "name": "Administrator",
  "created": "2022-09-30T15:21:45.0498161",
  "updated": null,
  "users": []
}
```

## Get Role By Id

### Get Role By Id Request

```js
GET {{host}}/api/roles/{{id}}
Authorization: Bearer {{token}}
```

### Get Role By Id Response

```js
200 Ok
```

```json
{
  "id": "04571743-0a86-45f5-901a-08daa13f9828",
  "name": "User",
  "created": "2022-09-28T12:52:53.390776",
  "updated": null,
  "users": []
}
```

## Get Roles

### Get Roles Request

```js
GET {{host}}/api/roles
Authorization: Bearer {{token}}
```

### Get Roles Response

```js
200 Ok
```

```json
// If no results an empty array will be provided
[
  {
    "id": "04571743-0a86-45f5-901a-08daa13f9828",
    "name": "User",
    "created": "2022-09-28T12:52:53.390776",
    "updated": null,
    "users": []
  }
]
```

## Update Role

### Update Role Request

```js
PUT {{host}}/api/roles
Content-Type: application/json
Authorization: Bearer {{token}}
```

```json

```

### Update Role Response

```js
204 No Content
```

## Delete Role

### Delete Role Request

```js
DELETE {{host}}/api/roles/{{id}}
Authorization: Bearer {{token}}
```

### Delete Role Response

```js
204 No Content
```