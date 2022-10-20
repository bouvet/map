# Verden Venter Optimus Api

For more information please visit the [Backend Wiki](https://github.com/bouvet/map/wiki/Backend) & [Azure Wiki](https://github.com/bouvet/map/wiki/Azure-Resources) pages

- [Verden Venter Optimus Api](#verden-venter-optimus-api)
  - [How to get started](#how-to-get-started)
  - [Deployment](#deployment)
  - [Docs](#docs)
  - [Example requests](#example-requests)
    - [Categories](#categories)
    - [Locations](#locations)
    - [Reviews](#reviews)
  - [Team](#team)
    - [Contributors](#contributors)
    - [Facilitators](#facilitators)

## How to get started

There is a few Azure resources you need to get started.
[Read more about Azure resources in the Wiki](https://github.com/bouvet/map/wiki/Azure-Resources)

- Azure Resource Group
  - Azure KeyVault
    - Secrets:
      - "DbConnectionString"
      - "azureBlobStorageConnectionString"
      - "SendGridApiKey"
      - "GoogleClientId"
      - "GoogleClientSecret"
      - "GoogleRedirectUri"
  - Azure SQL Server
    - Azure SQL database
  - Azure Storage Account
    - Azure blob storage
    - Azure CDN
  - App Service Plan
    - App Service

Set some secrets in user-secrets for development:

```bash
$dotnet user-secrets set "AzureProvider:KeyVaultUri" "<your Azure KeyVault connection string>"
$dotnet user-secrets set "AzureProvider:DbConnectionString" "<your DB connection string>"

$dotnet user-secrets set "JwtSettings:Secret" "<Jwt secret for this project>"
$dotnet user-secrets set "JwtSettings:ExpiryMinutes" "<How long JWT should be valid>"
$dotnet user-secrets set "JwtSettings:Issuer" "<JWT Issuer>"
$dotnet user-secrets set "JwtSettings:Audience" "<JWT Audience>"

$dotnet user-secrets set "SendGridSettings:ApiKey" "<SendGrid ApiKey>"
$dotnet user-secrets set "SendGridSettings:FromEmail" "<From which emails will be sent from>"
$dotnet user-secrets set "SendGridSettings:FromName" "<Sender name which receiver sees>"

$dotnet user-secrets set "GoogleAuthSettings:ClientId" "<Google Client Id>"
$dotnet user-secrets set "GoogleAuthSettings:ClientSecret" "<Google Client Secret>"
$dotnet user-secrets set "GoogleAuthSettings:RedirectUri" "<Google Client RedirectUri>"
```

List all user secrets:

```bash
$dotnet user-secrets list
```

To start the backend service in 'hot reload' mode:

```bash
$dotnet watch run
```

Test Production environment:

```bash
$dotnet watch run --environment "Production"
```

## Deployment

Build the project:

```bash
$dotnet publish -c Release -o ./bin/Publish
```

If you are using VSCode you need to:

- Install "Azure App Service" and "Azure Account" extensions.
- Log in to Azure through VSCode extension.
- Find your App Service.
- Add the following to Application Settings:
  - KeyVaultUri
  - JwtSecret
  - ExpiryMinutes
  - JwtIssuer
  - JwtAudience
  - SGFromEmail
  - SGFromName

Make sure your application have access to the KeyVault!

This can also be done via Azure portal under App Service - Settings - Configuration.

![Azure App Service](Docs/Images/Azure%20App%20Service%20-%20Application%20Settings.png)

## Docs

- [Authentication](Docs/Authentication.md)
- [Categories examples](Docs/Categories.md)
- [Locations examples](Docs/Locations.md)
- [Reviews examples](Docs/Reviews.md)
- [Users examples](Docs/Users.md)

## Example requests

> By installing "Rest Client" extension in vscode you can send request directly from vscode

### Categories

- [Create Category](Requests/Category/CreateCategory.http)
- [Delete Category](Requests/Category/DeleteCategory.http)
- [Get Categories](Requests/Category/GetCategories.http)
- [Get Categories in use](Requests/Category/GetCategoriesInUse.http)
- [Get Category](Requests/Category/GetCategory.http)
- [Update Category](Requests/Category/UpdateCategory.http)

### Locations

- [Create Location](Requests/Location/CreateLocation.http)
- [Delete Location](Requests/Location/DeleteLocation.http)
- [Get Location](Requests/Location/GetLocation.http)
- [Get Locations](Requests/Location/GetLocations.http)
- [Get Nearest Location](Requests/Location/GetNearestLocation.http)
- [Update Location](Requests/Location/UpdateLocation.http)

### Reviews

- [Create Review](Requests/Review/CreateReview.http)
- [Delete Review](Requests/Review/DeleteReview.http)
- [Get Review](Requests/Review/GetReview.http)
- [Get Reviews](Requests/Review/GetReviews.http)
- [Update Review](Requests/Review/UpdateReview.http)

## Team

### Contributors

- [Skjalg Eriksen](https://github.com/skjalg-eriksen)
- [Glen Sørbø](https://github.com/glensorbo)
- [Sindre Mohr](https://github.com/SindreMohr)
- [Margrethe Amundsen](https://github.com/margretheamundsen)

### Facilitators

- [Nick Rivas](https://github.com/nickrivas)
- [Andrea Esposito](https://github.com/AndreaEsposit)
