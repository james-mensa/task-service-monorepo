using System;
using backend.Core.Entities;

namespace backend.Core.Interfaces
{
    public class TaskClientResponse
    {
        public Guid Id { get; set; }
        public string Title { get; set; }=string.Empty;
        public string? Description { get; set; }
        public DateTime DueDate { get; set; }
        public TaskStatusItems Status { get; set; }
        public Guid CreatedByUserId { get; set; }
    }
}