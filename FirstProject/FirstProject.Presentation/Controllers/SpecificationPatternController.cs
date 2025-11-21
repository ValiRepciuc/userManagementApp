using FirstProject.Application.Interfaces.Repositories;
using FirstProject.Application.Mappers;
using FirstProject.Application.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers;

[Route("api/userSpec")]
[ApiController]
public class SpecificationPatternController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    public SpecificationPatternController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet("get-by-name-spec")]
    public async Task<IActionResult> GetUserByNameSpecification(string name)
    {
        var spec = new UserNameSpec(name);
        var result = await _unitOfWork.User.FindAsync(spec);
        return Ok(result.ToUserDTO());
    }

    [HttpGet("get-by-age-spec")]
    public async Task<IActionResult> GetUserByAgeSpecification(int age)
    {
        var spec = new UserAgeSpec(age);
        var result = await _unitOfWork.User.FindAsync(spec);
        return Ok(result.ToUserDTO());
    }

    [HttpGet("sortAll-by-name")]
    public async Task<IActionResult> GetAllUserByNameOrder()
    {
        var spec = new UserNameOrder();
        var result = await _unitOfWork.User.GetAllSpecAsync(spec);
        return Ok(result.Select(r => r.ToUserDTO()).ToList());
    }
    
    [HttpGet("sortAll-desc-by-name")]
    public async Task<IActionResult> GetAllUserByNameOrderDesc()
    {
        var spec = new UserNameOrderDesc();
        var result = await _unitOfWork.User.GetAllSpecAsync(spec);
        return Ok(result.Select(r => r.ToUserDTO()).ToList());
    }
    
    [HttpGet("sortAll-by-name-spec")]
    public async Task<IActionResult> GetUserByNameOrderBySpecification(string name)
    {
        var spec = new UserNameOrderBySpec(name);
        var result = await _unitOfWork.User.GetAllSpecAsync(spec);
        return Ok(result.Select(r => r.ToUserDTO()).ToList());
    }

    [HttpGet("sortAll-desc-by-name-spec")]
    public async Task<IActionResult> GetUserByNameByOrderDescSpecification(string name)
    {
        var spec = new UserNameOrderByDescSpec(name);
        var result = await _unitOfWork.User.GetAllSpecAsync(spec);
        return Ok(result.Select(r => r.ToUserDTO()).ToList());
    }

    [HttpGet("sortAll-by-age")]
    public async Task<IActionResult> GetUserByAgeOrderSpecification()
    {
        var spec = new UserAgeOrderSpec();
        var result = await _unitOfWork.User.GetAllSpecAsync(spec);
        return Ok(result.Select(r => r.ToUserDTO()).ToList());
    }

    [HttpGet("sortAll-desc-by-age")]
    public async Task<IActionResult> GetUserByAgeOrderDescSpecification()
    {
        var spec = new UserAgeOrderDescSpec();
        var result = await _unitOfWork.User.GetAllSpecAsync(spec);
        return Ok(result.Select(r => r.ToUserDTO()).ToList());
    }

    [HttpGet("sortAll-by-created")]
    public async Task<IActionResult> GetUserByCreatedOrderSpecification()
    {
        var spec = new UserCreatedOrderSpec();
        var result = await _unitOfWork.User.GetAllSpecAsync(spec);
        return Ok(result.Select(r => r.ToUserDTO()).ToList());
    }
    [HttpGet("sortAll-desc-by-created")]
    public async Task<IActionResult> GetUserByCreatedOrderDescSpecification()
    {
        var spec = new UserCreatedOrderDescSpec();
        var result = await _unitOfWork.User.GetAllSpecAsync(spec);
        return Ok(result.Select(r => r.ToUserDTO()).ToList());
    }
}