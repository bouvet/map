global using restapi.Common.ServiceUtils.ServiceErrors;
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
  app.UseRouting();
  // app.MapGet("/auth", () => Results.Redirect("/"));
  app.UseStaticFiles();
  app.UseAuthentication();
  app.UseAuthorization();
  app.MapControllers();
  app.Run();
}
