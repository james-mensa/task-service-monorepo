namespace backend.Core.Services
{
    public class AppSettings
    {
        public string AppName { get; set; } = string.Empty;
        public string DatabaseConnection { get; set; } = string.Empty;
        public string JwtSecret { get; set; } = string.Empty;
        public string JwtIssuer { get; set; } = string.Empty;
        public string JwtAudience { get; set; } = string.Empty;
        public string DatabaseName {get; set;}=string.Empty;
    }
}
