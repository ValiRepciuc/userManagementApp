using FirstProject.Application.DTOs.UserPermissions;
using FirstProject.Domain.Entities;

namespace FirstProject.Application.Interfaces.Services;

public interface IPermissionsService
{
    Task<List<PermissionDTO>> GetAllAsync();
    Task<PermissionDTO> GetByIdAsync(int id);
    Task <List<PermissionDTO>> GetAllByUserIdAsync(int userId);
    Task<PermissionDTO> CreateAsync(CreatePermissionsDTO createPermissionsDTO, int userId);
    Task<PermissionDTO> UpdateASync(UpdatePermissionDTO updatePermissionDTO, int id);
    Task<Permissions> DeleteAsync(int id);
}