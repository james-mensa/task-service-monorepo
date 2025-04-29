using System.ComponentModel.DataAnnotations;

namespace backend.Core.Dtos
{
    public class LoginUserDto
    {
        [Required]
        public string Email { get; set; }= String.Empty;
        [Required]
        public string Password { get; set; }=String.Empty;
    }
}