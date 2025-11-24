using FirstProject.Infrastructure.DbContexts; // Asigură-te că ai acest using pentru DatabaseContext
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore; // Necesar pentru .Migrate()
using Microsoft.Extensions.FileProviders;
using Presentation; // Namespace-ul unde ai clasa Configuration

var builder = WebApplication.CreateBuilder(args);

// 1. Configurare Servicii
builder.Services.AddControllers().AddControllersAsServices();
builder.Services.AddHttpContextAccessor();

// Aici se apelează metodele tale din Configuration.cs
builder.Services
    .AddDatabaseContext(builder.Configuration)
    .AddSwagger()
    .AddRepositories();

// Configurare CORS
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

// ==============================================================================
// ✅ ZONA DE MIGRARE AUTOMATĂ (Adăugat pentru Render)
// Acest bloc verifică dacă există migrări neaplicate și le execută la pornire.
// ==============================================================================
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        // Obținem contextul bazei de date
        var context = services.GetRequiredService<DatabaseContext>();
        
        // Aplică migrările (echivalentul comenzii 'dotnet ef database update')
        if (context.Database.GetPendingMigrations().Any())
        {
            context.Database.Migrate();
            Console.WriteLine("✅ Migrările au fost aplicate cu succes!");
        }
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "❌ A apărut o eroare la migrarea bazei de date.");
    }
}
// ==============================================================================

// 2. Configurare Pipeline (Middleware)
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

// Configurare fișiere statice (Avatare)
// Verificăm dacă folderul există, deși Dockerfile-ul îl creează, e bine să fim siguri
var avatarsPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/avatars");
if (!Directory.Exists(avatarsPath))
{
    Directory.CreateDirectory(avatarsPath);
}

app.UseStaticFiles(); // Pentru fișiere standard
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(avatarsPath),
    RequestPath = "/avatars"
});

app.UseRouting();

app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();

// Middleware-ul tău de erori
app.UseExceptionHandlerMiddleware();

app.MapControllers();

await app.RunAsync();
