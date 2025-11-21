using System.ComponentModel.DataAnnotations;

namespace FirstProject.Application.DTOs.Users;

public class CreateUserDTO
{
    [Required]
    public string name { get; set; }
    [Required]
    [EmailAddress(ErrorMessage = "Invalid email address.")]
    public string email { get; set; }
    [Required]
    [Phone(ErrorMessage = "Invalid phone number.")]
    public string phone { get; set; }
    public string avatar { get; set; }
    [Required]
    public DateOnly birthDate { get; set; }
}