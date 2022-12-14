# Locations

- [Locations](#locations)
  - [Get Locations Request](#get-locations-request)
  - [Create Location Request](#create-location-request)
  - [Get Location By Proximity Request](#get-location-by-proximity-request)
  - [Get Location By Id Request](#get-location-by-id-request)
  - [Update Location Request](#update-location-request)
  - [🔒Delete Location Request](#delete-location-request)

## Get Locations Request

```js
GET {{host}}/api/locations/{status}
```

```yml
Available statuses:
  - Approved
  - Under Review
  - Rejected
  - Reported
```

## Create Location Request

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
category = ""
longitude = 5.1234
latitude = 58.1234
```

## Get Location By Proximity Request

```yml
Required fields:
  - latitude
    - Example: 5.1234
  - longitude
    - Example: 58.1234
```

```js
GET {{host}}/api/locations/{{latitude}}&{{longitude}}
GET {{host}}/api/locations/{{latitude}}&{{longitude}}?category={{category}}
```

## Get Location By Id Request

```js
GET {{host}}/api/locations/{{id}}
```

## Update Location Request

```js
PUT {{host}}/api/locations/{{id}}
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

## 🔒Delete Location Request

```js
DELETE {{host}}/api/locations/{{id}}
Authorization: Bearer {{token}}
```
