using FirstProject.Application.DTOs.Users;
using FirstProject.Application.Helpers;
using FirstProject.Domain.Entities;

namespace FirstProject.Application.Mappers;

public static class UserMapper
{
    public static UserDTO ToUserDTO(this User userModel)
    {
        return new UserDTO
        {
            Id = userModel.Id,
            name = userModel.name,
            email = userModel.email,
            birthDate = userModel.birthDate,
            phone = userModel.phone,
            avatar = userModel.avatar,
            CreatedAt = userModel.CreatedAt,
            UpdatedAt = userModel.UpdatedAt,
            age = AgeHelper.calculateAge(userModel.birthDate),
        };
    }

    public static User ToUserFromCreate(this CreateUserDTO userModel)
    {
        return new User
        {
            name = userModel.name,
            email = userModel.email,
            phone = userModel.phone,
            avatar = userModel.avatar,
            birthDate = userModel.birthDate,
        };
    }

    public static void ToUserFromUpdate(this UpdateUserDTO userModel, User existingUser)
    {
        existingUser.name = userModel.name;
        existingUser.email = userModel.email;
        existingUser.phone = userModel.phone;
        existingUser.avatar = userModel.avatar;
        existingUser.birthDate = userModel.birthDate;
    }

   
}