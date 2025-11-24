
using FirstProject.Application.Interfaces.Repositories;
using FirstProject.Application.Interfaces.Services;
using FirstProject.Application.Services;
using FirstProject.Infrastructure.DbContexts;
using FirstProject.Infrastructure.Repositories;
using Infrastructure.Exceptions;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

namespace Presentation;

public static class Configuration
{
    public static IServiceCollection AddDatabaseContext(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<DatabaseContext>(options =>
        {
            //Configurare connectionstring pt bd
            options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
        });
        return services;
    }


    public static IServiceCollection AddSwagger(this IServiceCollection services)
    {
        services.AddSwaggerGen(option =>
        {
            option.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "FirstProject", 
                Version = "v1"
            });
        });

        return services;
    }

    public static IServiceCollection AddRepositories(this IServiceCollection services)
    {
        services
            .AddScoped<IUnitOfWork, UnitOfWork>()
            .AddScoped<IUserRepository, UserRepository>()
            .AddScoped<IUserService, UserService>()
            .AddScoped<IUserPermissionsRepository, UserPermissionsRepository>()
            .AddScoped<IPermissionsService, PermissionsService>();

            
        
        return services;
    }
    
    public static IApplicationBuilder UseExceptionHandlerMiddleware(this IApplicationBuilder app) => app.UseExceptionHandler(builder =>
    {
        builder.Run(async context =>
        {
            var contextFeature = context.Features.Get<IExceptionHandlerFeature>();
            if (contextFeature != null)
            {
                if (contextFeature.Error.InnerException is null)
                {
                    context.Items["Exception"] = contextFeature.Error.Message;
                    context.Items["StackTrace"] = contextFeature.Error.StackTrace;
                }
                else
                {
                    context.Items["Exception"] = $"{contextFeature.Error.Message}\n{contextFeature.Error.InnerException.Message}";
                    context.Items["StackTrace"] = $"{contextFeature.Error.StackTrace}\n{contextFeature.Error.InnerException.StackTrace}";
                }

                context.Response.StatusCode = contextFeature.Error switch
                {
                    BadRequestException => StatusCodes.Status400BadRequest,
                    _ => StatusCodes.Status500InternalServerError
                };

                if (contextFeature.Error is AggregateException aggregateException && aggregateException.InnerExceptions.Any(e => e is BadRequestException))
                {
                    context.Response.StatusCode = StatusCodes.Status400BadRequest;
                    await context.Response.WriteAsJsonAsync(aggregateException.InnerExceptions.Select(e => e.Message));
                }
                else
                {
                    var errors = new List<string> { contextFeature.Error.Message };

                    if (contextFeature.Error.InnerException is not null)
                        errors.Add(contextFeature.Error.InnerException.Message);

                    await context.Response.WriteAsJsonAsync(errors);
                }
            }
        });
    });
}