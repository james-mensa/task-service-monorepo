using System;
using backend.Core.Entities;

namespace backend.Core.Dtos
{
    public class UpdateTaskDto
    {
        public string? Title { get; set; }

        public string? Description { get; set; }

        public DateTime? DueDate { get; set; }

        public TaskStatusItems? Status { get; set; }
    }
}
