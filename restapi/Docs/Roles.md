# Roles 🔒

> **All endpoints require Authorization header!** > **Access level: Administrator**

- [Roles 🔒](#roles-)
  - [Create Role Request](#create-role-request)
  - [Get Role By Id Request](#get-role-by-id-request)
  - [Get Roles Request](#get-roles-request)
  - [Update Role Request](#update-role-request)
  - [Delete Role Request](#delete-role-request)

## Create Role Request

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

## Get Role By Id Request

```js
GET {{host}}/api/roles/{{id}}
Authorization: Bearer {{token}}
```

## Get Roles Request

```js
GET {{host}}/api/roles
Authorization: Bearer {{token}}
```

## Update Role Request

```js
PUT {{host}}/api/roles
Content-Type: application/json
Authorization: Bearer {{token}}
```

```json

```

## Delete Role Request

```js
DELETE {{host}}/api/roles/{{id}}
Authorization: Bearer {{token}}
```
