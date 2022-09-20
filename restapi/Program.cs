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

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerExamplesFromAssemblyOf<CategoryExample200OK>();
builder.Services.AddSwaggerExamplesFromAssemblyOf<CategoryExample201Created>();
builder.Services.AddSwaggerExamplesFromAssemblyOf<CategoryExample500InternalServerError>();
builder.Services.AddSwaggerExamplesFromAssemblyOf<CategoryDeleteExample409Conflict>();
builder.Services.AddSwaggerExamplesFromAssemblyOf<ListCategoryExample200OK>();
builder.Services.AddSwaggerExamplesFromAssemblyOf<CategoryExample400BadRequest>();
builder.Services.AddSwaggerExamplesFromAssemblyOf<CategoryPostExample409Conflict>();
builder.Services.AddSwaggerGen(c => c.ExampleFilters());

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

builder.Services.AddResponseCompression(options =>
{
  options.EnableForHttps = true;
});

builder.Services.AddCors(policy => policy.AddPolicy("anydomain", build =>
  {
    build.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
  }
));

var app = builder.Build();

app.UseCors("anydomain");

app.UseSwagger();
app.UseSwaggerUI();

app.UseResponseCompression();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseDefaultFiles();
app.UseStaticFiles();

app.Run();
