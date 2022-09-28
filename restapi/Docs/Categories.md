# Categories

- [Categories](#categories)
  - [Get Categories](#get-categories)
    - [Get Categories Request](#get-categories-request)
    - [Get Categories Response](#get-categories-response)
  - [Create Category](#create-category)
    - [Create Category Request](#create-category-request)
    - [Create Category Response](#create-category-response)
  - [Get Category](#get-category)
    - [Get Category Request](#get-category-request)
    - [Get Category Response](#get-category-response)
  - [Update Category](#update-category)
    - [Update Category Request](#update-category-request)
    - [Update Category Response](#update-category-response)
  - [Delete Category](#delete-category)
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
    "emoji": "⚽"
  },
  {
    "id": "60c951f3-d233-442b-7883-08da9ad92895",
    "name": "Basketball",
    "emoji": "\uD83C\uDFC0"
  }
]
```

## Create Category

### Create Category Request

```js
POST /api/categories
Content-Type: application/json
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

### Create Category Response

```js
201 Created
```

```yml
Location: {{host}}/api/Categories/{{id}}
```

```json
{
  "id": "735fbdfd-ab84-4cc8-ddbf-08da9b08fa95",
  "name": "Styrke",
  "emoji": "\uD83D\uDCAA"
}
```

## Get Category

### Get Category Request

```js
GET {{host}}/api/categories/{{id}}
```

### Get Category Response

```js
200 Ok
```

```json
{
  "id": "3e061bac-93c0-46b9-a502-08da96e466d8",
  "name": "Fotball",
  "emoji": "⚽"
}
```

## Update Category

### Update Category Request

```js
PUT {{host}}/api/categories/{{id}}
Content-Type: application/json
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

## Delete Category

### Delete Category Request

```js
DELETE {{host}}/api/categories/{{id}}
```

### Delete Category Response

```js
204 No Content
```
