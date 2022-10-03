# Locations

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
    - [Update Location Request](#update-location-request)
    - [Update Location Response](#update-location-response)
  - [🔒Delete Location](#delete-location)
    - [Delete Location Request](#delete-location-request)
    - [Delete Location Response](#delete-location-response)

## Get Locations

### Get Locations Request

```js
GET {{host}}/api/locations
```

### Get Locations Response

```js
200 Ok
```

```json
[
  {
    "id": "9fbf46b3-c5a5-450a-9b28-1a3167e2625a",
    "type": "Feature",
    "properties": {
      "title": "Lura Ballbinge",
      "description": "Skikkelig god ballbinge med 2 mål og nett rundt bingen",
      "image": "https://optimusblobs.azureedge.net/images/9fbf46b3-c5a5-450a-9b28-1a3167e2625a",
      "status": "Under Review",
      "rating": 2,
      "category": [
        {
          "id": "3e061bac-93c0-46b9-a502-08da96e466d8",
          "name": "Fotball",
          "emoji": "⚽"
        }
      ]
    },
    "geometry": {
      "coordinates": [
        5.736110748915053,
        58.88192994269119
      ]
    }
  }
]
```

## Create Location

### Create Location Request

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
```

```multipart/form-data
title = ""
description = ""
image = file
category = "60c951f3-d233-442b-7883-08da9ad92895"
longitude = 5.1234
latitude = 58.1234
```

### Create Location Response

```js
201 Created
```

```yml
Location: {{host}}/api/Locations/{{id}}
```

```json
{
  "id": "325ee2a3-efc0-4787-a85c-c1d0f2e20a74",
  "type": "Feature",
  "properties": {
    "title": "A new title!",
    "description": "A very long description as it needs 20 chars",
    "image": "https://optimusblobs.azureedge.net/images/dcdf5038-52fa-4789-911d-50b079a38a7a",
    "status": "Under Review",
    "rating": 0,
    "category": [
      {
        "id": "60c951f3-d233-442b-7883-08da9ad92895",
        "name": "Basketball",
        "emoji": "\uD83C\uDFC0"
      }
    ]
  },
  "geometry": {
    "coordinates": [
      5.12343456345,
      58.1234546546
    ]
  }
}
```

## Get Nearest Location

### Get Nearest Location Request

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

### Get Nearest Location Response

```js
200 Ok
```

```json
{
  "id": "325ee2a3-efc0-4787-a85c-c1d0f2e20a74",
  "type": "Feature",
  "properties": {
    "title": "A new title!",
    "description": "A very long description as it needs 20 chars",
    "image": "https://optimusblobs.azureedge.net/images/dcdf5038-52fa-4789-911d-50b079a38a7a",
    "status": "Under Review",
    "rating": 0,
    "category": [
      {
        "id": "60c951f3-d233-442b-7883-08da9ad92895",
        "name": "Basketball",
        "emoji": "\uD83C\uDFC0"
      }
    ]
  },
  "geometry": {
    "coordinates": [
      5.12343456345,
      58.1234546546
    ]
  }
}
```

## Get Location

### Get Location Request

```js
GET {{host}}/api/locations/{{id}}
```

### Get Location Response

```js
200 Ok
```

```json
{
  "id": "9fbf46b3-c5a5-450a-9b28-1a3167e2625a",
  "type": "Feature",
  "properties": {
    "title": "Lura Ballbinge",
    "description": "Skikkelig god ballbinge med 2 mål og nett rundt bingen",
    "image": "https://optimusblobs.azureedge.net/images/9fbf46b3-c5a5-450a-9b28-1a3167e2625a",
    "status": "Under Review",
    "rating": 2,
    "category": [
      {
        "id": "3e061bac-93c0-46b9-a502-08da96e466d8",
        "name": "Fotball",
        "emoji": "⚽"
      }
    ]
  },
  "geometry": {
    "coordinates": [
      5.736110748915053,
      58.88192994269119
    ]
  }
}
```

## Update Location

### Update Location Request

```js
PUT {{host}}/api/locations
Content-Type: multipart/form-data
```

```multipart/form-data
id = ""
title = ""
description = ""
Img = file
status = ""
category = ""
longitude = <number> (5.xxxx)
latitude = <number> (58.xxxx)
```

### Update Location Response

```js
204 No Content
```

## 🔒Delete Location

### Delete Location Request

```js
DELETE {{host}}/api/locations/{{id}}
Authorization: Bearer {{token}}
```

### Delete Location Response

```js
204 No Content
```
