<<<<<<< HEAD
global using restapi.Common.ServiceUtils.ServiceErrors;
=======
>>>>>>> c3bab50c635a2f21b1396738001752828fde266e
using restapi;

var builder = WebApplication.CreateBuilder(args);

{
  await builder.Services.AddDependenciesAsync(builder.Configuration);
}

var app = builder.Build();

{
  app.UseCors("any-domain");

  app.UseExceptionHandler("/error");
  app.UseResponseCompression();
  app.UseHttpsRedirection();
  app.UseAuthentication();
  app.UseAuthorization();
  app.MapControllers();
  app.UseDefaultFiles();
  app.UseStaticFiles();
  app.Run();
}
