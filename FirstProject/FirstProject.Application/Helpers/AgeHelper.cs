namespace FirstProject.Application.Helpers;

public class AgeHelper
{
    public static int calculateAge(DateOnly birthDate)
    {
        var today = DateOnly.FromDateTime(DateTime.Now);
        int age = today.Year - birthDate.Year;
        
        if(birthDate > today.AddYears(-age))
        {
            age = age - 1;
        }
        
        return age;
    }
}