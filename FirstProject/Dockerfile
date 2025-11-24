# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY . .
RUN dotnet restore
RUN dotnet publish -c Release -o /out

# Runtime Stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

COPY --from=build /out .

# ✅ creează folderul pentru upload-uri/avatars
RUN mkdir -p /app/wwwroot/avatars

EXPOSE 8080
ENTRYPOINT ["dotnet", "FirstProject.Presentation.dll"]
