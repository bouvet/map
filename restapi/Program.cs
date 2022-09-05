global using Microsoft.EntityFrameworkCore;
global using System.ComponentModel.DataAnnotations;
global using System.Text.Json.Serialization;
global using Microsoft.AspNetCore.Mvc;
global using restapi.Data;
global using restapi.Models;
global using restapi.Interfaces;
global using restapi.Services;
global using restapi.Dtos;
using Swashbuckle.AspNetCore.Filters;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using System;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerExamplesFromAssemblyOf<restapi.SwaggerExampleListCategory>();
builder.Services.AddSwaggerExamplesFromAssemblyOf<restapi.SwaggerExampleCategory>();
builder.Services.AddSwaggerExamplesFromAssemblyOf<restapi.SwaggerExampleListCategory404>();
builder.Services.AddSwaggerExamplesFromAssemblyOf<restapi.SwaggerExampleListCategory500>();
builder.Services.AddSwaggerExamplesFromAssemblyOf<restapi.SwaggerExampleListCategory400>();
builder.Services.AddSwaggerExamplesFromAssemblyOf<restapi.SwaggerExampleListCategory409Delete>();
builder.Services.AddSwaggerExamplesFromAssemblyOf<restapi.SwaggerExampleListCategory409Post>();
builder.Services.AddSwaggerGen(c => { c.ExampleFilters(); });


if (builder.Environment.IsDevelopment())
{
  System.Console.WriteLine("DEVELOPMENT");
  builder.Services.AddDbContext<DataContext>(opt => opt.UseSqlServer(builder.Configuration["ConnectionString"]));
}

if (builder.Environment.IsProduction())
{
  System.Console.WriteLine("PRODUCTION");
  var keyVaultEndpoint = new Uri(Environment.GetEnvironmentVariable("VaultUri"));
  builder.Configuration.AddAzureKeyVault(keyVaultEndpoint, new DefaultAzureCredential());
  var kvUri = "https://restapivault.vault.azure.net/";
  var client = new SecretClient(new Uri(kvUri), new DefaultAzureCredential());
  var secretConnectionString = await client.GetSecretAsync("ConnectionString");
  builder.Services.AddDbContext<DataContext>(opt => opt.UseSqlServer(secretConnectionString.Value.Value));
}

builder.Services.AddScoped<ILocationService, LocationService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();


builder.Services.AddCors(policy => policy.AddPolicy("anydomain", build =>
  {
    build.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
  }
));

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("anydomain");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseDefaultFiles();
app.UseStaticFiles();

app.Run();
