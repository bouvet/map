# Verden Venter Optimus Api

[Link for deployed production version](https://verdenventer.azurewebsites.net/swagger/index.html)

For more information please visit the [Backend Wiki page](https://github.com/bouvet/map/wiki/Backend)

- [Verden Venter Optimus Api](#verden-venter-optimus-api)
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
  - [Locations](#locations)
    - [Get Locations](#get-locations)
      - [Get Locations Request](#get-locations-request)
      - [Get Locations Response](#get-locations-response)
    - [Create Location](#create-location)
      - [Create Location Request](#create-location-request)
      - [Create Location Response](#create-location-response)
    - [Get Nearest Location](#get-nearest-location)
      - [Get Nearest Location Request](#get-nearest-location-request)
      - [Get Nearest Location Response](#get-nearest-location-response)
    - [Get Location](#get-location)
      - [Get Location Request](#get-location-request)
      - [Get Location Response](#get-location-response)
    - [Update Location](#update-location)
      - [🚧Update Location Request](#update-location-request)
      - [🚧Update Location Response](#update-location-response)
    - [Delete Location](#delete-location)
      - [Delete Location Request](#delete-location-request)
      - [Delete Location Response](#delete-location-response)
  - [Reviews](#reviews)
    - [Create Review](#create-review)
      - [Create Review Request](#create-review-request)
      - [Create Review Response](#create-review-response)
    - [Get Review](#get-review)
      - [Get Reviews Request](#get-reviews-request)
      - [Get Reviews Response](#get-reviews-response)
    - [Update Review](#update-review)
      - [🚧Update Review Request](#update-review-request)
      - [🚧Update Review Response](#update-review-response)
    - [Delete Review](#delete-review)
      - [Delete Review Request](#delete-review-request)
      - [Delete Review Response](#delete-review-response)
  - [🚧Users](#users)
    - [Create User](#create-user)
      - [Create User Request](#create-user-request)
      - [Create User Response](#create-user-response)
    - [Get User](#get-user)
      - [Get User Request](#get-user-request)
      - [Get User Response](#get-user-response)
    - [Update User](#update-user)
      - [Update User Request](#update-user-request)
      - [Update User Response](#update-user-response)
    - [Delete User](#delete-user)
      - [Delete User Request](#delete-user-request)
      - [Delete User Response](#delete-user-response)

## Categories

### Get Categories

#### Get Categories Request

```js
GET {{host}}/api/categories
```

#### Get Categories Response

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

### Create Category

#### Create Category Request

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
    "name": "Fotball",
    "emoji": "⚽"
  },
  "success": true,
  "statusCode": 201,
  "message": "Category Added!"
}
```

### Get Categories In Use

#### Get Categories In Use Request

```js
GET {{host}}/api/categories/InUse
```

#### Get Categories In Use Response

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

#### Update Category Response

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

### Get Locations

#### Get Locations Request

```js
GET {{host}}/api/locations
```

#### Get Locations Response

```js
200 Ok
```

```json
{
  "data": [
    {
      "id": "e4ea896b-f1e2-4d8f-5a00-08da8fe37d95",
      "type": "Feature",
      "properties": {
        "title": "Lura Ballbinge",
        "description": "Veldig god ballbinge med 2 mål, god gressmatte og gjerde bak mål for de som bommer.",
        "img": "",
        "status": "Under Review",
        "rating": 0,
        "category": [
          {
            "id": "0d870839-a74d-4293-2124-08da8fe1d9b8",
            "name": "Fotball",
            "emoji": "⚽"
          }
        ]
      },
      "geometry": {
        "coordinates": [
          5.736242,
          58.881887
        ],
        "type": "Point"
      }
    },
  ]
}
```

### Create Location

#### Create Location Request

```js
POST {{host}}/api/locations
Content-Type: multipart/form-data
```

```yml
Required fields:
  - title
  - description
  - longitude
  - latitude
  - category
```

```json
// JSON example but the API requires multipart/form-data!
{
  "title": "A title",
  "description": "A description",
  "img": "",
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

### Get Nearest Location

#### Get Nearest Location Request

```yml
Required fields:
  - latitude
    - Example: 5.1234
  - longitude
    - Example: 58.1234
```

```js
GET {{host}}/api/locations/{{latitude}}&{{longitude}}/category
GET {{host}}/api/locations/{{latitude}}&{{longitude}}/category?category={{category}}
```

#### Get Nearest Location Response

```js
200 Ok
```

```json
{
  "data": {
    "id": "f2048041-4d45-405e-a81e-0f08ca699125",
    "type": "Feature",
    "properties": {
      "title": "A title",
      "description": "A description",
      "img": "",
      "status": "Under Review",
      "rating": 4,
      "category": [
        {
          "id": "0d870839-a74d-4293-2124-08da8fe1d9b8",
          "name": "Fotball",
          "emoji": "⚽"
        }
      ]
    },
    "geometry": {
      "coordinates": [
        5.1234,
        58.1234
      ],
      "type": "Point"
    }
  },
  "success": true,
  "statusCode": 200,
  "message": ""
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
{
  "data": {
    "id": "f2048041-4d45-405e-a81e-0f08ca699125",
    "type": "Feature",
    "properties": {
      "title": "A title",
      "description": "A description",
      "img": "",
      "status": "Under Review",
      "rating": 4,
      "category": [
        {
          "id": "0d870839-a74d-4293-2124-08da8fe1d9b8",
          "name": "Fotball",
          "emoji": "⚽"
        }
      ]
    },
    "geometry": {
      "coordinates": [
        5.1234,
        58.1234
      ],
      "type": "Point"
    }
  },
  "success": true,
  "statusCode": 200,
  "message": ""
}
```

### Update Location

#### 🚧Update Location Request

> 📢 `This needs to be updated! Both docs and code.`
> 📢 `Endpoint needs to accept multipart/form-data`
> 📢 `To be able to upload new image.`

```js
PUT {{host}}/api/locations/{{id}}
Content-Type: application/json
```

```yml
Required fields:
  - title
  - description
  - longitude
  - latitude
  - category
```

```json
// JSON example but the API requires multipart/form-data!
{
  "title": "A title",
  "description": "A description",
  "img": "",
  "rating": "5",
  "longitude": 5.1234,
  "latitude": 58.1234,
  "category": ["0d870839-a74d-4293-2124-08da8fe1d9b8"]
}
```

#### 🚧Update Location Response

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

## Reviews

### Create Review

#### Create Review Request

```js
POST {{host}}/api/reviews
Content-Type: multipart/form-data
```

```yml
Required fields:
  - rating
  - text
  - locationId
```

```json
// JSON example but the API requires multipart/form-data!
{
  "rating": 3,
  "text": "",
  "image":, // image file
  "locationId": ""
}
```

#### Create Review Response

```js
201 Created
```

```yml
Location: {{host}}/api/reviews/{{id}}
```

```json
{
  "data": {
    "id": "b656f242-0a12-4343-bf0b-74139a008aae",
    "status": "Under Review",
    "text": "some text",
    "rating": 3,
    "image": "",
    "created": "2022-09-13T10:19:50.8030294+02:00",
    "updated": null,
    "locationId": "e4ea896b-f1e2-4d8f-5a00-08da8fe37d95"
  },
  "success": true,
  "statusCode": 201,
  "message": "Review successfully created!"
}
```

### Get Review

#### Get Reviews Request

```js
GET {{host}}/api/reviews
// Use the locationId query to get all reviews for a specific location
GET {{host}}/api/reviews?locationId=e4ea896b-f1e2-4d8f-5a00-08da8fe37d95
```

#### Get Reviews Response

```js
200 Ok
```

```json
{
  "data": [
    {
      "id": "7a0d6036-a3e6-4400-d83c-08da9006956d",
      "status": "A status",
      "text": "A text",
      "rating": 3,
      "image": "",
      "created": "2022-09-06T14:51:57.7378095",
      "updated": null,
      "locationId": "e4ea896b-f1e2-4d8f-5a00-08da8fe37d95"
    }
  ]
}
```

### Update Review

#### 🚧Update Review Request

> 📢 `This needs to be updated! Both docs and code.`
> 📢 `Endpoint needs to accept multipart/form-data`
> 📢 `To be able to upload new image.`

```js
PUT {{host}}/api/reviews/{{id}}
Content-Type: application/json
```

```json
// JSON example but the API requires multipart/form-data!
{
  "status": "string",
  "text": "string",
  "rating": 0,
  "image": "string",
  "locationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

#### 🚧Update Review Response

```js
200 OK
```

```json

```

### Delete Review

#### Delete Review Request

```js
DELETE {{host}}/api/reviews/{{id}}
```

#### Delete Review Response

```js
204 No Content
```

## 🚧Users

### Create User

#### Create User Request

```js
POST {{host}}/api/users
Content-Type: application/json
```

```yml
Required fields:
  - 
```

```json

```

#### Create User Response

```js
201 Created
```

```yml
Location: {{host}}/api/users/{{id}}
```

```json

```

### Get User

#### Get User Request

```js
GET {{host}}/api/users
```

#### Get User Response

```js
200 OK
```

```json

```

### Update User

#### Update User Request

```js
POST {{host}}/api/users/{{id}}
Content-Type: application/json
```

```yml
Required fields:
  - 
```

```json

```

#### Update User Response

```js
204 No Content
```

```yml
Location: {{host}}/api/users/{{id}}
```

### Delete User

#### Delete User Request

```js
DELETE {{host}}/api/users/{{id}}
```

#### Delete User Response

```js
204 No Content
```
