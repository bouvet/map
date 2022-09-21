global using Microsoft.EntityFrameworkCore;
global using System.ComponentModel.DataAnnotations;
global using System.Text.Json.Serialization;
global using Microsoft.AspNetCore.Mvc;
global using restapi.Data;
global using restapi.Models;
global using restapi.Interfaces;
global using restapi.Services;
global using restapi.Dtos;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var azureKeyVault = Environment.GetEnvironmentVariable("KeyVaultUri");

if (builder.Environment.IsProduction() && azureKeyVault is not null)
{
  Console.WriteLine("APPLICATION RUNNING IN PRODUCTION MODE");

  var keyVaultEndpoint = new Uri(azureKeyVault);

  builder.Configuration.AddAzureKeyVault(keyVaultEndpoint, new DefaultAzureCredential());

  var secretClient = new SecretClient(keyVaultEndpoint, new DefaultAzureCredential());

  var DbConnectionString = await secretClient.GetSecretAsync("DbConnectionString");

  Console.WriteLine(DbConnectionString.Value.Value);

  builder.Services.AddDbContext<DataContext>(opt => opt.UseSqlServer(DbConnectionString.Value.Value));
}

if (builder.Environment.IsDevelopment())
{
  Console.WriteLine("APPLICATION RUNNING IN DEVELOPMENT MODE");

  builder.Services.AddDbContext<DataContext>(opt => opt.UseSqlServer(builder.Configuration["Dev:DbConnectionString"]));
}

builder.Services.AddScoped<ILocationService, LocationService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IReviewService, ReviewService>();
builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddResponseCompression(options => options.EnableForHttps = true);

builder.Services.AddCors(policy => policy.AddPolicy("anydomain", build => build.WithOrigins("*").AllowAnyMethod().AllowAnyHeader()));

var app = builder.Build();

{
  app.UseCors("anydomain");

  app.UseSwagger();
  app.UseSwaggerUI();

  app.UseExceptionHandler("/error");
  app.UseResponseCompression();
  app.UseHttpsRedirection();
  app.UseAuthorization();
  app.MapControllers();
  app.UseDefaultFiles();
  app.UseStaticFiles();
  app.Run();
}
