using System.Text.RegularExpressions;

namespace FirstProject.Application.Helpers;

public class PhoneHelper
{
    private static readonly Regex PhoneRegex = new Regex(
        @"^07\d{8}$",
        RegexOptions.Compiled
    );

    public static bool IsValidPhone(string phone)
    {
        if (string.IsNullOrWhiteSpace(phone))
            return false;
        
        phone = NormalizePhone(phone);

        return PhoneRegex.IsMatch(phone);
    }

    public static string NormalizePhone(string phone)
    {
        var digits = phone.Replace("(", "").Replace(")", "");
        
        digits = new string(phone.Where(char.IsDigit).ToArray());
        Console.WriteLine($"[DIGITS]: {digits}");
        
        
        
        if (digits.StartsWith("40") && digits.Length == 11)
            digits = digits.Substring(2);

        Console.WriteLine($"[DIGITS]: {digits}");
            
        if (digits.StartsWith("+40") && digits.Length == 12)
            digits.Substring(3);
        
        Console.WriteLine($"[DIGITS]: {digits}");
        
        if (digits.StartsWith("0040") && digits.Length == 13)
            digits = digits.Substring(4);
        
        Console.WriteLine($"[DIGITS]: {digits}");
        
        if (digits.Length == 9 && digits.StartsWith("7"))
            digits = "0" + digits;
        
        Console.WriteLine($"[DIGITS]: {digits}");
        
        return digits;
    }
    
}