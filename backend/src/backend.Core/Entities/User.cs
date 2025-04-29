using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace backend.Core.Entities
{
public class User : IdentityUser<Guid>
{
    public ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();
}

}