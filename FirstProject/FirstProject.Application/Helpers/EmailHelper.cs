using System.Text.RegularExpressions;

namespace FirstProject.Application.Helpers;

public class EmailHelper
{
    private static readonly Regex EmailRegex = new Regex(
        "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$", RegexOptions.Compiled);

    public static bool IsValidEmail(string email)
    {
        if (string.IsNullOrWhiteSpace(email))
            return false;
        
        return EmailRegex.IsMatch(email);
    }
}