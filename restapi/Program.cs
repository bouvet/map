global using Microsoft.EntityFrameworkCore;
global using System.ComponentModel.DataAnnotations;
global using System.Text.Json.Serialization;
global using Microsoft.AspNetCore.Mvc;
global using restapi.Data;
global using restapi.Models;
global using restapi.Interfaces;
global using restapi.Services;
global using restapi.Dtos;
global using Swashbuckle.AspNetCore.Filters;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using restapi.Swagger;
using Microsoft.Extensions.Azure;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerExamplesFromAssemblyOf<CategoryExample200OK>();
builder.Services.AddSwaggerExamplesFromAssemblyOf<CategoryExample201Created>();
builder.Services.AddSwaggerExamplesFromAssemblyOf<CategoryExample500InternalServerError>();
builder.Services.AddSwaggerExamplesFromAssemblyOf<CategoryDeleteExample409Conflict>();
builder.Services.AddSwaggerExamplesFromAssemblyOf<ListCategoryExample200OK>();
builder.Services.AddSwaggerExamplesFromAssemblyOf<CategoryExample400BadRequest>();
builder.Services.AddSwaggerExamplesFromAssemblyOf<CategoryPostExample409Conflict>();
builder.Services.AddSwaggerGen(c => { c.ExampleFilters(); });

var azureKeyVault = Environment.GetEnvironmentVariable("VaultUri");
if (builder.Environment.IsProduction() && azureKeyVault is not null)
{
  System.Console.WriteLine("PRODUCTION");

  var keyVaultEndpoint = new Uri(azureKeyVault);
  builder.Configuration.AddAzureKeyVault(keyVaultEndpoint, new DefaultAzureCredential());

  var client = new SecretClient(keyVaultEndpoint, new DefaultAzureCredential());
  var secretConnectionString = await client.GetSecretAsync("ConnectionString");

  builder.Services.AddDbContext<DataContext>(opt => opt.UseSqlServer(secretConnectionString.Value.Value));
}

if (builder.Environment.IsDevelopment())
{
  System.Console.WriteLine("DEVELOPMENT");
  builder.Services.AddDbContext<DataContext>(opt => opt.UseSqlServer(builder.Configuration["ConnectionString"]));
}

builder.Services.AddScoped<ILocationService, LocationService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IReviewService, ReviewService>();
builder.Services.AddScoped<IUserService, UserService>();


builder.Services.AddResponseCompression(options =>
{
  options.EnableForHttps = true;
});
builder.Services.AddCors(policy => policy.AddPolicy("anydomain", build =>
  {
    build.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
  }
));
/*
builder.Services.AddAzureClients(clientBuilder =>
{
  clientBuilder.AddBlobServiceClient(builder.Configuration["azureBlobStorageConnectionString:blob"], preferMsi: true);
  clientBuilder.AddQueueServiceClient(builder.Configuration["azureBlobStorageConnectionString:queue"], preferMsi: true);
});
*/
var app = builder.Build();

//if (builder.Environment.IsDevelopment())
//{
  app.UseSwagger();
  app.UseSwaggerUI();
//}

app.UseResponseCompression();
app.UseCors("anydomain");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseDefaultFiles();
app.UseStaticFiles();

app.Run();
