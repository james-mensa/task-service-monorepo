
using System.ComponentModel.DataAnnotations;

namespace backend.Core.Dtos
{
public class RegisterUser{
    [Required]
    public string? Username { get; set; }
    
    [Required]
    public string? Email { get; set; }
    
    [Required]
    public string? Password { get; set; }   

}
}
