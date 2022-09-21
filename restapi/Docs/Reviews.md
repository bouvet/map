# Reviews

- [Reviews](#reviews)
  - [Create Review](#create-review)
    - [Create Review Request](#create-review-request)
    - [Create Review Response](#create-review-response)
  - [Get Review](#get-review)
    - [Get Review Request](#get-review-request)
    - [Get Review Response](#get-review-response)
  - [Get Reviews](#get-reviews)
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
  "id": "7da7e16e-8b07-4a20-a394-75f3329df06f",
  "status": "Under Review",
  "text": "",
  "rating": 1,
  "image": "",
  "created": "2022-09-20T13:11:09.797938",
  "updated": null,
  "locationId": "9fbf46b3-c5a5-450a-9b28-1a3167e2625a"
}
```

## Get Review

### Get Review Request

```js
GET {{host}}/api/reviews/{{id}}
```

### Get Review Response

```js
200 Ok
```

```json
{
  "id": "7da7e16e-8b07-4a20-a394-75f3329df06f",
  "status": "Under Review",
  "text": "",
  "rating": 1,
  "image": "",
  "created": "2022-09-20T13:11:09.797938",
  "updated": null,
  "locationId": "9fbf46b3-c5a5-450a-9b28-1a3167e2625a"
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
    "id": "c1a69b29-f4f9-46b6-bea8-a8d7dfff5c9b",
    "status": "Under Review",
    "text": "Skikkelig bra ja",
    "rating": 4,
    "image": "https://optimusblobs.azureedge.net/images/451f9127-0781-4e99-83f0-099ef90fe379",
    "created": "2022-09-20T10:18:31.0035154",
    "updated": null,
    "locationId": "9c3bd097-5606-4865-a14c-30c076a5a35c"
  },
  {
    "id": "181f3f0b-a7da-4553-b4d2-e019f9355a5f",
    "status": "Under Review",
    "text": "",
    "rating": 3,
    "image": "https://optimusblobs.azureedge.net/images/cdbe914a-88fa-4b94-8a77-b714375c2331",
    "created": "2022-09-20T10:13:58.6285696",
    "updated": "2022-09-20T10:38:34.9841325",
    "locationId": "9c3bd097-5606-4865-a14c-30c076a5a35c"
  }
]
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
