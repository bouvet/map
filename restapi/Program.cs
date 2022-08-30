global using Microsoft.EntityFrameworkCore;
global using System.ComponentModel.DataAnnotations;
global using System.Net.Mime;
global using Microsoft.AspNetCore.Mvc;
global using restapi.Data;
global using restapi.Models;
global using restapi.Interfaces;
global using restapi.Services;
global using restapi.Dtos;
using Swashbuckle.AspNetCore.Filters;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerExamplesFromAssemblyOf<restapi.SwaggerExampleListCategory>();
builder.Services.AddSwaggerExamplesFromAssemblyOf<restapi.SwaggerExampleCategory>();
builder.Services.AddSwaggerExamplesFromAssemblyOf<restapi.SwaggerExampleListCategory404>();
builder.Services.AddSwaggerExamplesFromAssemblyOf<restapi.SwaggerExampleListCategory500>();
builder.Services.AddSwaggerGen(c => { c.ExampleFilters(); });

builder.Services.AddDbContext<DataContext>(opt => opt.UseSqlServer(builder.Configuration["ConnectionString"]));

builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<ILocationService, LocationService>();
builder.Services.AddScoped<IPropertyService, PropertyService>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
