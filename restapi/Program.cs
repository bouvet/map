using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Microsoft.EntityFrameworkCore;
using restapi;
using restapi.Data;

var builder = WebApplication.CreateBuilder(args);

{
  builder.Services.AddDependencies();

  if (builder.Environment.IsProduction())
  {
    Console.WriteLine("APPLICATION RUNNING IN PRODUCTION MODE");

    var azureKeyVault = Environment.GetEnvironmentVariable("KeyVaultUri");

    var keyVaultEndpoint = new Uri(azureKeyVault!);

    builder.Configuration.AddAzureKeyVault(keyVaultEndpoint, new DefaultAzureCredential());

    var secretClient = new SecretClient(keyVaultEndpoint, new DefaultAzureCredential());

    var DbConnectionString = await secretClient.GetSecretAsync("DbConnectionString");

    builder.Services.AddDbContext<DataContext>(opt => opt.UseSqlServer(DbConnectionString.Value.Value));
  }

  if (builder.Environment.IsDevelopment())
  {
    Console.WriteLine("APPLICATION RUNNING IN DEVELOPMENT MODE");

    builder.Services.AddDbContext<DataContext>(opt => opt.UseSqlServer(builder.Configuration["Dev:DbConnectionString"]));
  }
}

var app = builder.Build();

{
  app.UseCors("any-domain");

  app.UseExceptionHandler("/error");
  app.UseResponseCompression();
  app.UseHttpsRedirection();
  app.UseAuthorization();
  app.MapControllers();
  app.UseDefaultFiles();
  app.UseStaticFiles();
  app.Run();
}
