using restapi;

var builder = WebApplication.CreateBuilder(args);

{
  await builder.Services.AddDependenciesAsync(builder.Environment, builder.Configuration);
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
