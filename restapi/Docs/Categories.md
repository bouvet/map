# Categories

- [Categories](#categories)
  - [Get Categories Request](#get-categories-request)
  - [Get Category By Id Request](#get-category-by-id-request)
  - [🔒Create Category Request](#create-category-request)
  - [🔒Update Category Request](#update-category-request)
  - [🔒Delete Category Request](#delete-category-request)

## Get Categories Request

```js
GET {{host}}/api/categories
```

## Get Category By Id Request

```js
GET {{host}}/api/categories/{{id}}
```

## 🔒Create Category Request

```js
POST /api/categories
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
  "name": "Golf",
  "emoji": "🏌️‍♂️"
}
```

## 🔒Update Category Request

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

## 🔒Delete Category Request

```js
DELETE {{host}}/api/categories/{{id}}
Authorization: Bearer {{token}}
```
