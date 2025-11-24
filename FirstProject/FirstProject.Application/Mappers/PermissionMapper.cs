using FirstProject.Application.DTOs.UserPermissions;
using FirstProject.Domain.Entities;

namespace FirstProject.Application.Mappers;

public static class PermissionMapper
{
    public static PermissionDTO ToPermissionDTO(this Permissions permission)
    {
        return new PermissionDTO
        {
            Id = permission.Id,
            PermissionName = permission.PermissionName,
            UserId = permission.UserId
        };
    }

    public static Permissions ToPermissionFromCreate(this CreatePermissionsDTO permissionModel, int userId)
    {
        return new Permissions
        {
            PermissionName = permissionModel.PermissionName,
            UserId = userId
        };
    }

    public static void ToPermissionFromUpdate(this UpdatePermissionDTO permissionModel, Permissions existingPermission)
    {
        existingPermission.PermissionName = permissionModel.PermissionName;
    }
}