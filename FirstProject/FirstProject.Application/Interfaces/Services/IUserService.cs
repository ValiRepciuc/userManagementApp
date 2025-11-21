using FirstProject.Application.DTOs.Users;
using FirstProject.Domain.Entities;

namespace FirstProject.Application.Interfaces.Services;

public interface IUserService
{
    Task<List<UserDTO>> GetAllAsync();
    Task<UserDTO> GetByIdAsync(int id);
    Task<UserDTO> CreateAsync(CreateUserDTO createUserDto);
    Task<UserDTO> UpdateAsync(UpdateUserDTO updateUserDto, int id);
    Task<User> DeleteAsync(int id);
}