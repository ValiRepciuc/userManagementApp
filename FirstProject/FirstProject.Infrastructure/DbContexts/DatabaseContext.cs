using System.Linq.Expressions;
using FirstProject.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Npgsql.EntityFrameworkCore.PostgreSQL;

namespace FirstProject.Infrastructure.DbContexts;

public class DatabaseContext : DbContext
{
    public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
    {
    }
    
    public DbSet<User> Users => Set<User>();
    public DbSet<Permissions> UserPermissions => Set<Permissions>();
    
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<User>(entity =>
        {
            entity.HasMany(u => u.Permissions)
                .WithOne(p => p.User)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        
        builder.ApplyConfigurationsFromAssembly(typeof(DatabaseContext).Assembly);
        
        foreach (var entityType in builder.Model.GetEntityTypes())
        {
            AddEntityQueryFilter(builder, entityType);

            foreach (var mutableForeignKey in entityType.GetForeignKeys())
                mutableForeignKey.DeleteBehavior = DeleteBehavior.Restrict;
        }
    }
    
    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new())
    {
        var entries = ChangeTracker
            .Entries()
            .Where(e => e is { Entity: BaseEntity, State: EntityState.Modified });

        foreach (var entityEntry in entries)
            ((BaseEntity)entityEntry.Entity).UpdatedAt = DateTime.UtcNow;

        return base.SaveChangesAsync(cancellationToken);
    }
    
    private static void AddEntityQueryFilter(ModelBuilder builder, IReadOnlyTypeBase entityType)
    {
        var type = entityType.ClrType;
        if (type.IsSubclassOf(typeof(BaseEntity)))
        {
            var parameter = Expression.Parameter(type);
            var propertyInfo = Expression.Property(parameter, "DeletedAt");
            var nullConstant = Expression.Constant(null, typeof(DateTime?));
            var equalExpression = Expression.Equal(propertyInfo, nullConstant);
            var filter = Expression.Lambda(equalExpression, parameter);
            builder.Entity(type).HasQueryFilter(filter).HasIndex("DeletedAt");
        }
    }
}