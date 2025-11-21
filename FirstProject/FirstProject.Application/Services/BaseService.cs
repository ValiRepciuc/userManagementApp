using FirstProject.Application.Interfaces.Repositories;
using FirstProject.Application.Interfaces.Services;

namespace FirstProject.Application.Services;

public class BaseService : IBaseService
{
    private readonly IUnitOfWork _unitOfWork;
    public BaseService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;       
    }
}