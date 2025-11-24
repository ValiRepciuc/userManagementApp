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
    [HttpGet("search")]
    public async Task<IActionResult> SearchUsers(
        string? search = null,
        string? filterBy = null,
        string? sort = null,
        int? exactAge = null)
    
    {
        var spec = new UserSpecification(search, filterBy, sort, exactAge);
        var result = await _unitOfWork.User.GetAllSpecAsync(spec);

        return Ok(result.Select(u => u.ToUserDTO()).ToList());
    }

}