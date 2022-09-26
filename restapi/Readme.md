# Verden Venter Optimus Api

For more information please visit the [Backend Wiki](https://github.com/bouvet/map/wiki/Backend) & [Azure Wiki](https://github.com/bouvet/map/wiki/Azure-Resources) pages

## How to get started

There is a few Azure resources you need to get started.
[Read more about Azure resources in the Wiki](https://github.com/bouvet/map/wiki/Azure-Resources)

- Azure Resource Group
  - Azure KeyVault
    - Secrets:
      - "DbConnectionString"
      - "azureBlobStorageConnectionString"
      - "JwtSecret"
      - "JwtIssuer"
      - "JwtAudience"
      - "JwtExpiryMinutes"
  - Azure SQL Server
    - Azure SQL database
  - Azure Storage Account
    - Azure blob storage
    - Azure CDN
  - App Service Plan
    - App Service

Set Azure KeyVault Uri in user-secrets for development environment:

```bash
$dotnet user-secrets set "AzureSettings:KeyVaultUri" "<your Azure KeyVault connection string>"
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

### Deployment

Build the project:

```bash
$dotnet publish -c Release -o ./bin/Publish
```

If you are using VSCode you need to:

- Install "Azure App Service" and "Azure Account" extensions.
- Login in to Azure through VSCode extension.
- Find your App Service.
- Add "KeyVaultUri" to Application Settings.

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

#### Contributors

- [Skjalg Eriksen](https://github.com/skjalg-eriksen)
- [Glen Sørbø](https://github.com/glensorbo)
- [Sindre Mohr](https://github.com/SindreMohr)
- [Margrethe Amundsen](https://github.com/margretheamundsen)

#### Facilitators

- [Nick Rivas](https://github.com/nickrivas)
- [Andrea Esposito](https://github.com/AndreaEsposit)
