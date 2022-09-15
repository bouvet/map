- [Categories](#categories)
  - [Get Categories](#get-categories)
    - [Get Categories Request](#get-categories-request)
    - [Get Categories Response](#get-categories-response)
  - [Create Category](#create-category)
    - [Create Category Request](#create-category-request)
    - [Create Category Response](#create-category-response)
  - [Get Categories In Use](#get-categories-in-use)
    - [Get Categories In Use Request](#get-categories-in-use-request)
    - [Get Categories In Use Response](#get-categories-in-use-response)
  - [Get Category](#get-category)
    - [Get Category Request](#get-category-request)
    - [Get Category Response](#get-category-response)
  - [Update Category](#update-category)
    - [Update Category Request](#update-category-request)
    - [Update Category Response](#update-category-response)
  - [Delete Category](#delete-category)
    - [Delete Category Request](#delete-category-request)
    - [Delete Category Response](#delete-category-response)

# Categories

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
{
  "data": [
    {
      "id": "0d870839-a74d-4293-2124-08da8fe1d9b8",
      "name": "Fotball",
      "emoji": "⚽"
    },
  ]
}
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
  "data": {
    "id": "b08edce2-cfd9-409e-d70f-08da94be4d2a",
    "name": "Fotball",
    "emoji": "⚽"
  },
  "success": true,
  "statusCode": 201,
  "message": "Category Added!"
}
```

## Get Categories In Use

### Get Categories In Use Request

```js
GET {{host}}/api/categories/InUse
```

### Get Categories In Use Response

```js
200 Ok
```

```json
{
  "data": [
    {
      "id": "0d870839-a74d-4293-2124-08da8fe1d9b8",
      "name": "Fotball",
      "emoji": "⚽"
    },
  ]
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
  "data": {
    "id": "0d870839-a74d-4293-2124-08da8fe1d9b8",
    "name": "Fotball",
    "emoji": "⚽"
  },
  "success": true,
  "statusCode": 200,
  "message": "Category fetched!"
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
  "name": "Fotball!",
  "emoji": "⚽"
}
```

### Update Category Response

```js
200 OK
```

```json
{
  "data": {
    "id": "0d870839-a74d-4293-2124-08da8fe1d9b8",
    "name": "Fotball",
    "emoji": "⚽"
  },
  "success": true,
  "statusCode": 200,
  "message": "Category Updated!"
}
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
