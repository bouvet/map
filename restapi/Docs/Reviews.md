# Reviews

- [Reviews](#reviews)
  - [Create Review](#create-review)
    - [Create Review Request](#create-review-request)
    - [Create Review Response](#create-review-response)
  - [Get Review By Id](#get-review-by-id)
    - [Get Review By Id Request](#get-review-by-id-request)
    - [Get Review By Id Response](#get-review-by-id-response)
  - [Get Reviews](#get-reviews)
    - [Get Reviews Request](#get-reviews-request)
    - [Get Reviews Response](#get-reviews-response)
  - [🔒Update Review](#update-review)
    - [Update Review Request](#update-review-request)
    - [Update Review Response](#update-review-response)
  - [Delete Review](#delete-review)
    - [Delete Review Request](#delete-review-request)
    - [Delete Review Response](#delete-review-response)

## Create Review

### Create Review Request

```js
POST {{host}}/api/reviews
Content-Type: multipart/form-data
```

```yml
Required fields:
  - rating
  - locationId
```

```multipart/form-data
rating = 3
text = ""
image = file
locationId = 9fbf46b3-c5a5-450a-9b28-1a3167e2625a
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
  "id": "",
  "status": "",
  "text": "",
  "originalImage": {
    "id": "",
    "originalFileName": "",
    "blobUri": "",
    "cdnUri": "",
    "contentType": "",
    "uploaded": "",
    "uploader": {
      "id": "",
      "email": "",
      "firstName": "",
      "lastName": ""
    },
    "originalImageId": null,
    "locationId": "",
    "reviewId": ""
  },
  "webpImage": {
    "id": "",
    "originalFileName": "",
    "blobUri": "",
    "cdnUri": "",
    "contentType": "",
    "uploaded": "",
    "uploader": {
      "id": "",
      "email": "",
      "firstName": "",
      "lastName": ""
    },
    "originalImageId": "",
    "locationId": "",
    "reviewId": ""
  },
  "created": "",
  "updated": null,
  "creator": {
    "id": "",
    "email": "",
    "firstName": "",
    "lastName": ""
  },
  "editor": null,
  "locationId": ""
}
```

## Get Review By Id

### Get Review By Id Request

```js
GET {{host}}/api/reviews/{{id}}
```

### Get Review By Id Response

```js
200 Ok
```

```json
{
  "id": "",
  "status": "",
  "text": "",
  "originalImage": {
    "id": "",
    "originalFileName": "",
    "blobUri": "",
    "cdnUri": "",
    "contentType": "",
    "uploaded": "",
    "uploader": {
      "id": "",
      "email": "",
      "firstName": "",
      "lastName": ""
    },
    "originalImageId": null,
    "locationId": "",
    "reviewId": ""
  },
  "webpImage": {
    "id": "",
    "originalFileName": "",
    "blobUri": "",
    "cdnUri": "",
    "contentType": "",
    "uploaded": "",
    "uploader": {
      "id": "",
      "email": "",
      "firstName": "",
      "lastName": ""
    },
    "originalImageId": "",
    "locationId": "",
    "reviewId": ""
  },
  "created": "",
  "updated": null,
  "creator": {
    "id": "",
    "email": "",
    "firstName": "",
    "lastName": ""
  },
  "editor": null,
  "locationId": ""
}
```

## Get Reviews

### Get Reviews Request

```js
GET {{host}}/api/reviews

// Use the locationId query param to get all reviews for a specific location
GET {{host}}/api/reviews?locationId=e4ea896b-f1e2-4d8f-5a00-08da8fe37d95
```

### Get Reviews Response

```js
200 Ok
```

```json

// If no results an empty array will be provided
[
  {
    "id": "",
    "status": "",
    "text": "",
    "originalImage": {
      "id": "",
      "originalFileName": "",
      "blobUri": "",
      "cdnUri": "",
      "contentType": "",
      "uploaded": "",
      "uploader": {
        "id": "",
        "email": "",
        "firstName": "",
        "lastName": ""
      },
      "originalImageId": null,
      "locationId": "",
      "reviewId": ""
    },
    "webpImage": {
      "id": "",
      "originalFileName": "",
      "blobUri": "",
      "cdnUri": "",
      "contentType": "",
      "uploaded": "",
      "uploader": {
        "id": "",
        "email": "",
        "firstName": "",
        "lastName": ""
      },
      "originalImageId": "",
      "locationId": "",
      "reviewId": ""
    },
    "created": "",
    "updated": null,
    "creator": {
      "id": "",
      "email": "",
      "firstName": "",
      "lastName": ""
    },
    "editor": null,
    "locationId": ""
  }
]
```

## 🔒Update Review

### Update Review Request

```js
PUT {{host}}/api/reviews
Authorization: Bearer {{usertoken}}
Content-Type: multipart/form-data
```

```yml
Required fields:
  - id
```

```multipart/form-data
id = 181f3f0b-a7da-4553-b4d2-e019f9355a5f
status = ""
text = ""
rating = 3
image = file
locationId = 9fbf46b3-c5a5-450a-9b28-1a3167e2625a
```

### Update Review Response

```js
204 No Content
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
