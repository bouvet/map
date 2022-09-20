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
    - [🚧Update Location Response](#update-location-response)
  - [Delete Location](#delete-location)
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

### Create Location Response

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

## Update Location

### Update Location Request

```js
PUT {{host}}/api/locations
Content-Type: multipart/form-data
```

```multipart/form-data

title = ""
description = ""
Img = file
status = ""
category = ""
longitude = <number> (5.xxxx)
latitude = <number> (58.xxxx)

```

### 🚧Update Location Response

```js
200 OK
```

```json
{
  "data": {
    "id": "9c3bd097-5606-4865-a14c-30c076a5a35c",
    "type": "Feature",
    "properties": {
      "title": "A title!",
      "description": "a Description",
      "img": "https://optimusblobs.azureedge.net/images/e52b16c5-6a97-4f1b-a113-7df09f6bb7f4",
      "status": "Under Review",
      "rating": 3,
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
  },
  "success": true,
  "statusCode": 200,
  "message": "Location successfully updated!"
}
```

## Delete Location

### Delete Location Request

```js
DELETE {{host}}/api/locations/{{id}}
```

### Delete Location Response

```js
204 No Content
```
