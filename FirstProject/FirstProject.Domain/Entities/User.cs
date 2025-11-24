namespace FirstProject.Domain.Entities;

public class User : BaseEntity
{
    public string name { get; set; } = String.Empty;
    public DateOnly birthDate { get; set; } 
    public string email { get; set; } = String.Empty;
    public string phone { get; set; } = String.Empty;
    public string avatar { get; set; } = String.Empty;
    
    public ICollection<Permissions> Permissions { get; set; } = new List<Permissions>();
}