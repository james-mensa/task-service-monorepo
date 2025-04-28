using System;

namespace backend.Core.Entities
{
    public class TaskItem
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public DateTime DueDate { get; set; }
        public TaskStatusItems Status { get; set; } = TaskStatusItems.Pending;
        public Guid CreatedByUserId { get; set; }

        public User CreatedByUser { get; set; }
    }

    public enum TaskStatusItems
    {
        Pending,
        InProgress,
        Completed
    }
}
