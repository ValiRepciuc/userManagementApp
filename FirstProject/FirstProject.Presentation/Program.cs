using FirstProject.Infrastructure.DbContexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Presentation;

var builder = WebApplication.CreateBuilder(args);

// ----------------------------
// SERVICES
// ----------------------------
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
        policy.WithOrigins(
            "http://localhost:5173",
            "https://user-management-app-seven-drab.vercel.app",
            "https://user-management-app-git-main-valentins-projects-5ce82bb8.vercel.app"
        )
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

var app = builder.Build();

// ----------------------------
// AUTOMATIC MIGRATE FOR RENDER
// ----------------------------
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    try
    {
        var context = services.GetRequiredService<DatabaseContext>();

        if (context.Database.GetPendingMigrations().Any())
        {
            context.Database.Migrate();
            Console.WriteLine("✅ Migrations applied successfully.");
        }
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "❌ Error applying migrations!");
    }
}


// ----------------------------
// MIDDLEWARE PIPELINE
// ----------------------------
app.UseSwagger(c => { c.RouteTemplate = "swagger/{documentName}/swagger.json"; });
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "FirstProject");
    c.RoutePrefix = "swagger";
});


// Static files (root)
app.UseStaticFiles();

// Static files for avatars
var avatarsPath = Path.Combine(app.Environment.ContentRootPath, "wwwroot/avatars");
if (!Directory.Exists(avatarsPath))
{
    Directory.CreateDirectory(avatarsPath);
}

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(avatarsPath),
    RequestPath = "/avatars"
});


app.UseRouting();

app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();

app.UseExceptionHandlerMiddleware();

app.MapControllers();

await app.RunAsync();
