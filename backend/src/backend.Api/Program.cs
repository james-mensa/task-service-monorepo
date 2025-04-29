using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using backend.Core.Interfaces;
using backend.Core.Services;
using backend.Infrastructure.Data;
using System.Text;
using backend.Core.Entities;
using Microsoft.AspNetCore.Identity;
var builder = WebApplication.CreateBuilder(args);


// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var commonSettings = builder.Configuration.GetSection("CommonSettings").Get<CommonSettings>();
var JwtSettings = builder.Configuration.GetSection("JwtSettings").Get<JwtSettings>();
var AllowedHosts = builder.Configuration.GetSection("AllowedHosts").Get<string>();


if (commonSettings == null || JwtSettings ==null || AllowedHosts==null )
{
    throw new InvalidOperationException("AppSettings or CommonSettings configuration section is missing.");
}

AppSettings appSettings = new AppSettings {
    CommonSettings = commonSettings,
    JwtSettings = JwtSettings,
    AllowedHosts = AllowedHosts
};

builder.Services.AddSingleton(appSettings);

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(commonSettings.DatabaseConnection));

builder.Services.AddSingleton<ICustomLogger>(provider => 
    new CustomLogger("Application")
);


builder.Services.AddIdentity<User, IdentityRole<Guid>>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

// JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidIssuer =JwtSettings.Issuer,
            ValidAudience =JwtSettings.Audience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtSettings.Secret ))
        };
    });

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();