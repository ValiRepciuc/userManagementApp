using FirstProject.Infrastructure.DbContexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Npgsql.EntityFrameworkCore.PostgreSQL;

namespace Domain.Database;

public class DatabaseContextFactory : IDesignTimeDbContextFactory<DatabaseContext>
{
    public DatabaseContext CreateDbContext(string[] args)
    {
        var configuration = new ConfigurationBuilder()
            .SetBasePath(Path.GetFullPath(@"../FirstProject.Presentation"))
            .AddJsonFile("appsettings.json", true)
            .Build();

        var optionsBuilder = new DbContextOptionsBuilder<DatabaseContext>();
        var connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING");

        if (string.IsNullOrWhiteSpace(connectionString))
        {
            connectionString = configuration.GetConnectionString("DefaultConnection");
        }
        
        optionsBuilder.UseNpgsql(connectionString);
        
        return new DatabaseContext(optionsBuilder.Options);
    }
}
