# Categories

- [Categories](#categories)
  - [Get Categories](#get-categories)
    - [Get Categories Request](#get-categories-request)
    - [Get Categories Response](#get-categories-response)
  - [🔒Create Category](#create-category)
    - [Create Category Request](#create-category-request)
    - [Create Category Response](#create-category-response)
  - [Get Category By Id](#get-category-by-id)
    - [Get Category By Id Request](#get-category-by-id-request)
    - [Get Category By Id Response](#get-category-by-id-response)
  - [🔒Update Category](#update-category)
    - [Update Category Request](#update-category-request)
    - [Update Category Response](#update-category-response)
  - [🔒Delete Category](#delete-category)
    - [Delete Category Request](#delete-category-request)
    - [Delete Category Response](#delete-category-response)

## Get Categories

### Get Categories Request

```js
GET {{host}}/api/categories
```

### Get Categories Response

```js
200 Ok
```

```json
[
  {
    "id": "3e061bac-93c0-46b9-a502-08da96e466d8",
    "name": "Fotball",
    "emoji": "⚽",
    "creator": null,
    "editor": null
  },
  {
    "id": "f2c5e17b-1b05-43c4-fb53-08daa6c2022c",
    "name": "Golf",
    "emoji": "🏌️‍♂️",
    "creator": {
      "id": "5e5b4c22-48b1-46c9-8572-7f22d67a748c",
      "email": "admin@email.com",
      "firstName": null,
      "lastName": null
    },
    "editor": {
      "id": "5e5b4c22-48b1-46c9-8572-7f22d67a748c",
      "email": "admin@email.com",
      "firstName": null,
      "lastName": null
    }
  }
]
```

## 🔒Create Category

### Create Category Request

```js
POST /api/categories
Content-Type: application/json
Authorization: Bearer {{admintoken}}
```

```yml
Required fields:
  - name
  - emoji
```

```json
{
  "name": "Golf",
  "emoji": "🏌️‍♂️"
}
```

### Create Category Response

```js
201 Created
```

```yml
Location: {{host}}/api/Categories/{{id}}
```

```json
{
  "id": "",
  "name": "",
  "emoji": "",
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
```

## Get Category By Id

### Get Category By Id Request

```js
GET {{host}}/api/categories/{{id}}
```

### Get Category By Id Response

```js
200 Ok
```

```json
{
  "id": "",
  "name": "",
  "emoji": "",
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
```

## 🔒Update Category

### Update Category Request

```js
PUT {{host}}/api/categories/{{id}}
Content-Type: application/json
Authorization: Bearer {{token}}
```

```yml
Required fields:
  - name
  - emoji
```

```json
{
  "name": "Fotball",
  "emoji": "⚽"
}
```

### Update Category Response

```js
204 No Content
```

## 🔒Delete Category

### Delete Category Request

```js
DELETE {{host}}/api/categories/{{id}}
Authorization: Bearer {{token}}
```

### Delete Category Response

```js
204 No Content
```
