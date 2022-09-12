# Verden Venter Optimus Api

[Link for deployed production version](https://verdenventer.azurewebsites.net/swagger/index.html)

For more information please visit the [Backend Wiki page](https://github.com/bouvet/map/wiki/Backend)

- [Verden Venter Optimus Api](#verden-venter-optimus-api)
  - [Categories](#categories)
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
  - [Locations](#locations)
    - [Create Location](#create-location)
      - [Create Location Request](#create-location-request)
      - [Create Location Response](#create-location-response)
    - [Get Location](#get-location)
      - [Get Location Request](#get-location-request)
      - [Get Location Response](#get-location-response)
    - [Update Location](#update-location)
      - [Update Location Request](#update-location-request)
      - [Update Location Response](#update-location-response)
    - [Delete Location](#delete-location)
      - [Delete Location Request](#delete-location-request)
      - [Delete Location Response](#delete-location-response)

## Categories

### Create Category

#### Create Category Request

```js
POST /api/categories
Content-Type: application/json
```

```json
{
  "name": "Fotball",
  "emoji": "⚽"
}
```

#### Create Category Response

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
    "name": "Fotball2",
    "emoji": "⚽"
  },
  "success": true,
  "statusCode": 201,
  "message": "Category Added!"
}
```

### Get Category

#### Get Category Request

```js
GET {{host}}/api/categories/{{id}}
```

#### Get Category Response

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

### Update Category

#### Update Category Request

```js
PUT {{host}}/api/categories/{{id}}
Content-Type: application/json
```

```json
{
  "name": "Fotball23",
  "emoji": "⚽"
}
```

#### Update Category Response

```js
200 OK
```

```json
{
  "data": {
    "id": "b08edce2-cfd9-409e-d70f-08da94be4d2a",
    "name": "Fotball23",
    "emoji": "⚽"
  },
  "success": true,
  "statusCode": 200,
  "message": "Category Updated!"
}
```

### Delete Category

#### Delete Category Request

```js
DELETE {{host}}/api/categories/{{id}}
```

#### Delete Category Response

```js
204 No Content
```

## Locations

### Create Location

#### Create Location Request

```js
POST {{host}}/api/locations
Content-Type: multipart/form-data
```

```json
{
  "title": "A title",
  "description": "A description",
  "rating": "5",
  "longitude": 5.1234,
  "latitude": 58.1234,
  "category": ["0d870839-a74d-4293-2124-08da8fe1d9b8"]
}
```

#### Create Location Response

```js
201 Created
```

```yml
Location: {{host}}/api/Locations/{{id}}
```

```json
{
  "data": {
    "id": "4afc7c42-8cd9-4583-ad87-4b203776c012",
    "type": "Feature",
    "properties": {
      "title": "",
      "description": "",
      "img": "",
      "status": "Under Review",
      "rating": 0,
      "category": []
    },
    "geometry": {
      "coordinates": [
        0,
        0
      ],
      "type": "Point"
    }
  },
  "success": true,
  "statusCode": 201,
  "message": "Location successfully added!"
}
```

### Get Location

#### Get Location Request

```js
GET {{host}}/api/locations/{{id}}
```

#### Get Location Response

```js
200 Ok
```

```json

```

### Update Location

#### Update Location Request

```js
PUT {{host}}/api/locations/{{id}}
Content-Type: application/json
```

```json
{
  "properties": {
    "title": "A title",
    "description": "A description",
    "status": "Under Review",
    "category": [
      "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    ]
  },
  "geometry": {
    "coordinates": [
      5.1234,
      58.1234
    ]
  }
}
```

#### Update Location Response

```js
200 OK
```

```json

```

### Delete Location

#### Delete Location Request

```js
DELETE {{host}}/api/locations/{{id}}
```

#### Delete Location Response

```js
204 No Content
```
