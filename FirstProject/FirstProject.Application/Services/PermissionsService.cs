using FirstProject.Application.DTOs.UserPermissions;
using FirstProject.Application.Interfaces.Repositories;
using FirstProject.Application.Interfaces.Services;
using FirstProject.Application.Mappers;
using FirstProject.Domain.Entities;

namespace FirstProject.Application.Services;

public class PermissionsService : BaseService, IPermissionsService
{
    private readonly IUnitOfWork _unitOfWork;
    public PermissionsService(IUnitOfWork unitOfWork) : base(unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<List<PermissionDTO>> GetAllAsync()
    {
        var permissions = await _unitOfWork.UserPermissions.GetAllAsync();
        var permissionsDto = permissions.Select(p => p.ToPermissionDTO()).ToList();
        return permissionsDto;
    }

    public async Task<PermissionDTO> GetByIdAsync(int id)
    {
        var permission = await _unitOfWork.UserPermissions.GetByIdAsync(id);
        
        if(permission == null)
            throw new Exception("Permission not found");
        
        return permission.ToPermissionDTO();
        
    }

    public async  Task<List<PermissionDTO>> GetAllByUserIdAsync(int userId)
    {
        var userPermissions = await _unitOfWork.UserPermissions.GetPermissionsByUserId(userId);
        
        var permissionsDto = userPermissions.Select(p => p.ToPermissionDTO()).ToList();
        return permissionsDto;
    }

    public async Task<PermissionDTO> CreateAsync(CreatePermissionsDTO createPermissionsDTO, int userId)
    {
        var permission = createPermissionsDTO.ToPermissionFromCreate(userId);
        
        _unitOfWork.UserPermissions.Add(permission);
        await _unitOfWork.SaveChangesAsync();
        return permission.ToPermissionDTO();
    }

    public async Task<PermissionDTO> UpdateASync(UpdatePermissionDTO updatePermissionDTO, int id)
    {
        var existingPermission = await _unitOfWork.UserPermissions.GetByIdAsync(id);
        
        if(existingPermission == null)
            throw new Exception("Permission not found");
        
        updatePermissionDTO.ToPermissionFromUpdate(existingPermission);
        await _unitOfWork.SaveChangesAsync();
        
        return existingPermission.ToPermissionDTO();
    }

    public async Task<Permissions> DeleteAsync(int id)
    {
        var existingPermission = await _unitOfWork.UserPermissions.GetByIdAsync(id);
        
        if(existingPermission == null)
            throw new Exception("Permission not found");
        
        _unitOfWork.UserPermissions.Delete(existingPermission);
        await _unitOfWork.SaveChangesAsync();
        
        return existingPermission;
    }
}