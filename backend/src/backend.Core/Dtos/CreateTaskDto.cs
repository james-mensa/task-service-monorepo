using System;
using System.ComponentModel.DataAnnotations;
using backend.Core.Entities;

namespace backend.Core.Dtos
{
    public class CreateTaskDto
    {
        [Required]
        public string Title { get; set; }=String.Empty;

        public string? Description { get; set; }

        [Required]
        public DateTime DueDate { get; set; }

        public TaskStatusItems Status { get; set; } = TaskStatusItems.Pending;
    }
}
