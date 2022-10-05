# Locations

- [Locations](#locations)
  - [Get Locations](#get-locations)
    - [Get Locations Request](#get-locations-request)
    - [Get Locations Response](#get-locations-response)
  - [Create Location](#create-location)
    - [Create Location Request](#create-location-request)
    - [Create Location Response](#create-location-response)
  - [Get Location By Proximity](#get-location-by-proximity)
    - [Get Location By Proximity Request](#get-location-by-proximity-request)
    - [Get Location By Proximity Response](#get-location-by-proximity-response)
  - [Get Location By Id](#get-location-by-id)
    - [Get Location By Id Request](#get-location-by-id-request)
    - [Get Location By Id Response](#get-location-by-id-response)
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
    "id": "",
    "type": "Feature",
    "creator": {
      "id": "",
      "email": "",
      "firstName": null,
      "lastName": null
    },
    "editor": {
      "id": "",
      "email": "",
      "firstName": null,
      "lastName": null
    },
    "properties": {
      "title": "",
      "description": "",
      "image": "",
      "status": "Under Review",
      "rating": 0,
      "category": [
        {
          "id": "",
          "name": "",
          "emoji": "",
          "creator": null,
          "editor": null
        },
        {
          "id": "",
          "name": "",
          "emoji": "",
          "creator": {
            "id": "",
            "email": "",
            "firstName": null,
            "lastName": null
          },
          "editor": {
            "id": "",
            "email": "",
            "firstName": null,
            "lastName": null
          }
        }
      ]
    },
    "geometry": {
      "coordinates": [
        5.3454362342,
        58.2345346547
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
  "id": "",
  "type": "Feature",
  "creator": {
    "id": "",
    "email": "",
    "firstName": null,
    "lastName": null
  },
  "editor": null,
  "properties": {
    "title": "",
    "description": "",
    "image": "",
    "status": "Under Review",
    "rating": 0,
    "category": [
      {
        "id": "",
        "name": "",
        "emoji": "",
        "creator": {
          "id": "",
          "email": "",
          "firstName": null,
          "lastName": null
        },
        "editor": {
          "id": "",
          "email": "",
          "firstName": null,
          "lastName": null
        }
      }
    ]
  },
  "geometry": {
    "coordinates": [
      5.3454362342,
      58.2345346547
    ]
  }
}
```

## Get Location By Proximity

### Get Location By Proximity Request

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

### Get Location By Proximity Response

```js
200 Ok
```

```json
{
  "id": "",
  "type": "Feature",
  "creator": null,
  "editor": null,
  "properties": {
    "title": "",
    "description": "",
    "image": "",
    "status": "Approved",
    "rating": 0,
    "category": [
      {
        "id": "",
        "name": "",
        "emoji": "",
        "creator": null,
        "editor": null
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

## Get Location By Id

### Get Location By Id Request

```js
GET {{host}}/api/locations/{{id}}
```

### Get Location By Id Response

```js
200 Ok
```

```json
{
  "id": "",
  "type": "Feature",
  "creator": {
    "id": "",
    "email": "",
    "firstName": null,
    "lastName": null
  },
  "editor": {
    "id": "",
    "email": "",
    "firstName": null,
    "lastName": null
  },
  "properties": {
    "title": "",
    "description": "",
    "image": "",
    "status": "Under Review",
    "rating": 0,
    "category": [
      {
        "id": "",
        "name": "",
        "emoji": "",
        "creator": null,
        "editor": null
      },
      {
        "id": "",
        "name": "",
        "emoji": "",
        "creator": {
          "id": "",
          "email": "",
          "firstName": null,
          "lastName": null
        },
        "editor": {
          "id": "",
          "email": "",
          "firstName": null,
          "lastName": null
        }
      }
    ]
  },
  "geometry": {
    "coordinates": [
      5.3454362342,
      58.2345346547
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
