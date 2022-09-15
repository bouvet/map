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

# Reviews

## Create Review

### Create Review Request

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

### Create Review Response

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

## Get Review

### Get Reviews Request

```js
GET {{host}}/api/reviews
// Use the locationId query to get all reviews for a specific location
GET {{host}}/api/reviews?locationId=e4ea896b-f1e2-4d8f-5a00-08da8fe37d95
```

### Get Reviews Response

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

## Update Review

### 🚧Update Review Request

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

### 🚧Update Review Response

```js
200 OK
```

```json

```

## Delete Review

### Delete Review Request

```js
DELETE {{host}}/api/reviews/{{id}}
```

### Delete Review Response

```js
204 No Content
```
