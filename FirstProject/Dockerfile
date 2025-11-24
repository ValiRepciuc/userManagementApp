# ============================
# BUILD STAGE
# ============================
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY . .
RUN dotnet restore
RUN dotnet publish -c Release -o /out


# ============================
# RUNTIME STAGE
# ============================
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Copiem rezultatul build-ului
COPY --from=build /out .

# Creăm folderul pentru avatare
RUN mkdir -p /app/wwwroot/avatars

# Render folosește portul 8080
EXPOSE 8080

# Rulează aplicația
ENTRYPOINT ["dotnet", "FirstProject.Presentation.dll"]
