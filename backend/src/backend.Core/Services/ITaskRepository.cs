
using backend.Core.Entities;

namespace backend.Core.Interfaces
{
    public interface ITaskRepository
    {
        Task<TaskItem> CreateAsync(TaskItem task);
        Task<IEnumerable<TaskItem>> GetUsersTasksAsync(Guid userId, TaskStatusItems? status = null, DateTime? dueDate = null);
        Task<TaskItem?> GetTasksByIdAsync(Guid taskId, Guid userId);
        Task<bool> UpdateAsync(TaskItem task);
        Task<bool> DeleteAsync(TaskItem task);
    }
}
