using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace backend.Core.Entities
{
    public class User: IdentityUser<Guid> 
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();
    }
}