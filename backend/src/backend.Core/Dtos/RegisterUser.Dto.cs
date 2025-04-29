
using System.ComponentModel.DataAnnotations;

namespace backend.Core.Dtos
{
public class RegisterUserDto
{
    [Required]
    [MinLength(3)]
    public string userName { get; set; } = string.Empty;
    
    [Required]
    [EmailAddress]
    public string email { get; set; } = string.Empty;
    
    [Required]
    [DataType(DataType.Password)]
    [MinLength(6, ErrorMessage = "Password must be at least 6 characters long.")]
    public string password { get; set; } = string.Empty;
}
}
