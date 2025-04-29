

using backend.Core.Dtos;
using backend.Core.Entities;

namespace backend.Core.Interfaces
{
        public interface ITaskService
    {
        Task<IEnumerable<TaskClientResponse>> GetUserTasksAsync(Guid userId, TaskStatusItems? status, DateTime? dueDate);
        Task<TaskClientResponse> GetTaskByIdAsync(Guid taskId, Guid userId);
        Task<TaskClientResponse> CreateTaskAsync(CreateTaskDto dto, Guid userId);
        Task<bool> UpdateTaskAsync(Guid taskId, UpdateTaskDto dto, Guid userId);
        Task<bool> DeleteTaskAsync(Guid taskId, Guid userId);
    }
}