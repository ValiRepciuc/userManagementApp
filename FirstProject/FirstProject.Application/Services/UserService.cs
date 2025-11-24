using FirstProject.Application.DTOs.Users;
using FirstProject.Application.Helpers;
using FirstProject.Application.Interfaces.Repositories;
using FirstProject.Application.Interfaces.Services;
using FirstProject.Application.Mappers;
using FirstProject.Domain.Entities;
using Infrastructure.Exceptions.Email;
using Infrastructure.Exceptions.Phone;
using Infrastructure.Exceptions.User;

namespace FirstProject.Application.Services;

public class UserService : BaseService, IUserService
{
    private readonly IUnitOfWork _unitOfWork;
    public UserService(IUnitOfWork unitOfWork) : base(unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }
    
    public async Task<List<UserDTO>> GetAllAsync()
    {
        var users = await _unitOfWork.User.GetAllAsync();
        var usersDto = users.Select(u => u.ToUserDTO()).ToList();
        return usersDto;
    }

    public async Task<UserDTO> GetByIdAsync(int id)
    {
        var user = await _unitOfWork.User.GetByIdAsync(id);

        if (user == null)
        {
            throw new UserNotFoundException(id);
        }
        
        return user.ToUserDTO();
    }

    public async Task<UserDTO> CreateAsync(CreateUserDTO createUserDto)
    {
        var user = createUserDto.ToUserFromCreate();

        if (AgeHelper.calculateAge(user.birthDate) < 18)
        {
            throw new UserUnderageException();
        }

        if (AgeHelper.calculateAge(user.birthDate) > 75)
        {
            throw new UserOverAgeException();
        }

        if (!PhoneHelper.IsValidPhone(user.phone))
        {
            throw new PhoneNotValidException(createUserDto.phone);
        }
        
        if (!EmailHelper.IsValidEmail(createUserDto.email))
        {
            throw new EmailNotValidException(createUserDto.email);
        }

        if (await _unitOfWork.User.ExistsAsync(u => u.email == createUserDto.email))
            throw new EmailAlreadyExistsException(createUserDto.email);

        if (await _unitOfWork.User.ExistsAsync(u => u.phone == createUserDto.phone))
            throw new PhoneAlreadyExistsException(createUserDto.phone);
        
        user.CreatedAt = DateTime.UtcNow;
        user.UpdatedAt = DateTime.UtcNow;
        
        _unitOfWork.User.Add(user);
        await _unitOfWork.SaveChangesAsync();
        return user.ToUserDTO();
        
    }

    public async Task<UserDTO> UpdateAsync(UpdateUserDTO updateUserDto, int id)
    {
        var exitingUser = await _unitOfWork.User.GetByIdAsync(id);
        if (exitingUser == null)
            throw new UserNotFoundException(id);
        
        if (AgeHelper.calculateAge(updateUserDto.birthDate) < 18)
        {
            throw new UserUnderageException();
        }

        if (!PhoneHelper.IsValidPhone(updateUserDto.phone))
        {
            throw new PhoneNotValidException(updateUserDto.phone);
        }

        if (!EmailHelper.IsValidEmail(updateUserDto.email))
        {
            throw new EmailNotValidException(updateUserDto.email);
        }

        if (await _unitOfWork.User.ExistsAsync(u => u.email == updateUserDto.email && u.Id != id))
            throw new EmailAlreadyExistsException(updateUserDto.email);

        if (await _unitOfWork.User.ExistsAsync(u => u.phone == updateUserDto.phone && u.Id != id))
            throw new PhoneAlreadyExistsException(updateUserDto.phone);
        
        updateUserDto.ToUserFromUpdate(exitingUser);
        updateUserDto.updatedAt = DateTime.UtcNow;
        await _unitOfWork.SaveChangesAsync();
        
        return exitingUser.ToUserDTO();
    }

    public async Task<User> DeleteAsync(int id)
    {
        var exitingUser = await _unitOfWork.User.GetByIdAsync(id);
        if(exitingUser == null)
            throw new UserNotFoundException(id);
        
        _unitOfWork.User.Delete(exitingUser);
        await _unitOfWork.SaveChangesAsync();
        
        return exitingUser;
    }
}