
namespace backend.Core.Services;
public class AppSetting
{

    public string JwtSecret { get; set; } = string.Empty;
    public int JwtExpirationMinutes { get; set; }
    public string DbConnectionString { get; set; } = string.Empty;
}