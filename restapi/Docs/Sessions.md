# Sessions🔒

> **All endpoints require Authorization header!**

- [Sessions🔒](#sessions)
  - [Create Session Request](#create-session-request)
  - [Get Session By Id Request](#get-session-by-id-request)
  - [Get All Sessions Request](#get-all-sessions-request)
  - [Get Sessions Request](#get-sessions-request)
  - [Delete Session Request](#delete-session-request)

## Create Session Request

```js
POST {{host}}/api/sessions
Authorization: Bearer {{token}}
Content-Type: application/json
```

```json
{
  "LocationId": "",
  "Registered": "", // Format: Year-Month-Day : 2022-09-30
  "UserId": ""
}
```

## Get Session By Id Request

```js
GET {{host}}/api/sessions/{{id}}
Authorization: Bearer {{token}}
```

## Get All Sessions Request

```js
GET {{host}}/api/sessions/mySessions
Authorization: Bearer {{token}}
```

## Get Sessions Request

```js
GET {{host}}/api/sessions
Authorization: Bearer {{token}}
Content-Type: application/json
```

```json
{
  "LocationId": ""
}
```

## Delete Session Request

```js
DELETE {{host}}/api/sessions/{{id}}
Authorization: Bearer {{token}}
```
