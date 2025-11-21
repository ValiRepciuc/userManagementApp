namespace FirstProject.Application.DTOs.Users;

public class UserDTO
{
    public int Id { get; set; }
    public string name { get; set; }
    public string email { get; set; }
    public string phone { get; set; }
    public string avatar { get; set; }
    public DateOnly birthDate { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public int age { get; set; }
}