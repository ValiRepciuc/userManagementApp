using FirstProject.Application.DTOs.Users;

namespace FirstProject.Application.DTOs.UserPermissions;

public class PermissionDTO
{
    public int Id { get; set; }
    public string PermissionName { get; set; }
    public int UserId { get; set; }
}