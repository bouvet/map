# Reviews

- [Reviews](#reviews)
  - [Create Review](#create-review)
    - [Create Review Request](#create-review-request)
    - [Create Review Response](#create-review-response)
  - [Get Review](#get-review)
    - [Get Reviews Request](#get-reviews-request)
    - [Get Reviews Response](#get-reviews-response)
  - [Update Review](#update-review)
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
  "data": {
    "id": "181f3f0b-a7da-4553-b4d2-e019f9355a5f",
    "status": "Under Review",
    "text": "",
    "rating": 3,
    "image": "",
    "created": "2022-09-20T10:13:58.6285696",
    "updated": null,
    "locationId": "9fbf46b3-c5a5-450a-9b28-1a3167e2625a"
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

### Update Review Request

```js
PUT {{host}}/api/reviews
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
200 OK
```

```json
{
  "data": {
    "id": "181f3f0b-a7da-4553-b4d2-e019f9355a5f",
    "status": "Under Review",
    "text": "",
    "rating": 3,
    "image": "https://optimusblobs.azureedge.net/images/cdbe914a-88fa-4b94-8a77-b714375c2331",
    "created": "2022-09-20T10:13:58.6285696",
    "updated": "2022-09-20T10:38:34.9841325",
    "locationId": "9c3bd097-5606-4865-a14c-30c076a5a35c"
  },
  "success": true,
  "statusCode": 200,
  "message": "Review successfully updated!"
}
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
