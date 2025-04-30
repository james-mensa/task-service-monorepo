using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using backend.Core.Interfaces;
using backend.Core.Services;
using backend.Infrastructure.Data;
using System.Text;
using backend.Core.Entities;
using Microsoft.AspNetCore.Identity;
using backend.Infrastructure.Repositories;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authorization;
var builder = WebApplication.CreateBuilder(args);


// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var commonSettings = builder.Configuration.GetSection("CommonSettings").Get<CommonSettings>();
var JwtSettings = builder.Configuration.GetSection("JwtSettings").Get<JwtSettings>();
var AllowedHosts = builder.Configuration.GetSection("AllowedHosts").Get<string>();


if (commonSettings == null || JwtSettings == null || AllowedHosts == null)
{
    throw new InvalidOperationException("AppSettings or CommonSettings configuration section is missing.");
}

AppSettings appSettings = new AppSettings
{
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

builder.Services.AddScoped<ITaskRepository, TaskRepository>();
builder.Services.AddScoped<ITaskService, TaskService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.WithOrigins(commonSettings.CROS_LIST)
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Bearer {token}\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement()
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme = "oauth2",
                Name = "Bearer",
                In = ParameterLocation.Header,
            },
            new List<string>()
        }
    });
});

// JWT Configuration
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        ValidIssuer = JwtSettings.Issuer,
        ValidAudience = JwtSettings.Audience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtSettings.Secret)),
        ClockSkew = TimeSpan.Zero
    };
});

// Configure the default authorization policy
builder.Services.AddAuthorization(options =>
{
    options.DefaultPolicy = new AuthorizationPolicyBuilder()
            .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
            .RequireAuthenticatedUser()
            .Build();

});

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseRouting();
app.UseCors("AllowAll");


app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();