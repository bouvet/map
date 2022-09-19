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
  - Azure SQL Server
    - Azure SQL database
  - Azure Storage Account
    - Azure blob storage
    - Azure CDN
  - App Service Plan
    - App Service

Set development DB connection string:
This can either be an Azure dev/prod db, or a locally install MSSQL server

```bash
$dotnet user-secrets set "Dev:DbConnectionString" "<your connection string>"
```

You can view your user secrets

```bash
$dotnet user-secrets list
```

To start the backend service in 'hot reload' mode

```bash
$dotnet watch run
```

You can test Production environment also
(Even if this runs on your computer, it doesn't mean it works when published to Azure)

```bash
$dotnet watch run --environment "Production"
```

In ./Properties/launchsettings.json add "KeyVaultUri":
This needs to be added in both "restapi" & "IIS Express" profiles.

```json
"environmentVariables": {
  "ASPNETCORE_ENVIRONMENT": "Development",
  "KeyVaultUri": "https://<YOUR KEYVAULT NAME>.vault.azure.net/" // Add this line
}
```

### Deployment

Build:

```bash
$dotnet publish -c Release -o ./bin/Publish
```

## Docs

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
