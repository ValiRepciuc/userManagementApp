using FirstProject.Application.DTOs.UserPermissions;
using FirstProject.Application.DTOs.Users;
using FirstProject.Application.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers;

[Route("api/permissions")]
[ApiController]
public class PermissionController : ControllerBase
{
    private readonly IPermissionsService _permissionsService;
    public PermissionController(IPermissionsService permissionsService)
    {
        _permissionsService = permissionsService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllAsync()
    {
        var permissions = await _permissionsService.GetAllAsync();
        return Ok(permissions);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetByIdAsync(int id)
    {
        var permission = await _permissionsService.GetByIdAsync(id);
        return Ok(permission);
    }

    [HttpGet("user/{userId:int}")]
    public async Task<IActionResult> GetByUserIdAsync(int userId)
    {
        var userPermissions = await _permissionsService.GetAllByUserIdAsync(userId);
        return Ok(userPermissions);
    }

    [HttpPost]
    [Route("user/{userId:int}")]
    public async Task<IActionResult> CreateAsync([FromBody] CreatePermissionsDTO permission, int userId)
    {
        var createdPermission = await _permissionsService.CreateAsync(permission, userId);
        return Ok(createdPermission);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateAsync([FromBody] UpdatePermissionDTO permission, int id)
    {
        var existingPermission = await _permissionsService.UpdateASync(permission, id);
        return Ok(existingPermission);
        
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteAsync(int id)
    {
        var permission = await _permissionsService.DeleteAsync(id);
        return Ok(permission);
    }
}
