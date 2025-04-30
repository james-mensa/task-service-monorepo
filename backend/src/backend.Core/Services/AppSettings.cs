using System.ComponentModel.DataAnnotations;

namespace backend.Core.Services
{
    public class AppSettings
    {
        public LoggingSettings Logging { get; set; } = new();
        public string AllowedHosts { get; set; } = "*"; 
        public CommonSettings CommonSettings {get; set;}= new();
        public JwtSettings JwtSettings { get; set; } = new();
            public override string ToString()
    {
        return $"Database: {CommonSettings?.DatabaseConnection}, " +
               $"Issuer: {JwtSettings?.Issuer}, Audience: {JwtSettings?.Audience}";
    }
    }

    public class LoggingSettings
    {
        public LogLevel LogLevel { get; set; } = new LogLevel(); 
    }

    public class LogLevel
    {
        public string Default { get; set; } = "Information";
        public string MicrosoftAspNetCore { get; set; } = "Warning";
    }

    public class CommonSettings
    {
        [Required]
        public string AppName { get; set; } ="TaskAuth";

        [Required]
        public string? DatabaseConnection { get; set; }

        [Required]
        public string? DatabaseName { get; set; }
        public string? CROS_LIST { get; set; }
    }

    public class JwtSettings
    {
        [Required]
        public string Secret { get; set; } = "defaultSecret";

        [Required]
        public string Issuer { get; set; } = "TaskManagementApp"; 

        [Required]
        public string Audience { get; set; } = "TaskManagementUsers";
    }
}

