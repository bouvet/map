# Reviews

- [Reviews](#reviews)
  - [Create Review Request](#create-review-request)
  - [Get Review By Id Request](#get-review-by-id-request)
  - [Get Reviews Request](#get-reviews-request)
  - [🔒Update Review Request](#update-review-request)
  - [🔒Delete Review Request](#delete-review-request)

## Create Review Request

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
locationId = ""
```

## Get Review By Id Request

```js
GET {{host}}/api/reviews/{{id}}
```

## Get Reviews Request

```js
GET {{host}}/api/reviews

// Use the locationId query param to get all reviews for a specific location
GET {{host}}/api/reviews?locationId=<locationId>
```

## 🔒Update Review Request

```js
PUT {{host}}/api/reviews/{{id}}
Authorization: Bearer {{token}}
Content-Type: multipart/form-data
```

```multipart/form-data
status = ""
text = ""
rating = 3
image = file
locationId = ""
```

## 🔒Delete Review Request

```js
DELETE {{host}}/api/reviews/{{id}}
Authorization: Bearer {{token}}
```
