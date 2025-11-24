using Microsoft.Extensions.FileProviders;
using Presentation;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers().AddControllersAsServices();

builder.Services.AddHttpContextAccessor();

builder.Services
    .AddDatabaseContext(builder.Configuration)
    .AddSwagger()
    .AddRepositories();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "https://user-management-1f23yio2y-valentins-projects-5ce82bb8.vercel.app/")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});



var app = builder.Build();
app.UseSwagger(c => { c.RouteTemplate = "swagger/{documentName}/swagger.json"; });
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "FirstProject");
    c.RoutePrefix = "swagger";
    c.DocumentTitle = $"FirstProject {app.Environment.EnvironmentName} - Swagger UI";
    c.DisplayRequestDuration();
    c.EnablePersistAuthorization();
    c.DefaultModelsExpandDepth(0);
});

app.UseStaticFiles();

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/avatars")),
    RequestPath = "/avatars"
});

app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.UseExceptionHandlerMiddleware();
app.MapControllers();
app.UseCors("AllowFrontend");



await app.RunAsync();


