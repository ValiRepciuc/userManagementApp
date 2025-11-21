namespace FirstProject.Application.DTOs.Users;

public class UpdateUserDTO
{
    public string name { get; set; }
    public string email { get; set; }
    public string phone { get; set; }
    public string avatar { get; set; }
    public DateOnly birthDate { get; set; }
    
    public DateTime updatedAt { get; set; }
}