namespace FirstProject.Domain.Entities;

public class Permissions : BaseEntity
{
    public string PermissionName { get; set; }
    
    public int UserId { get; set; }
    public User User { get; set; }
}