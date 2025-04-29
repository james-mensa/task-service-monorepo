using backend.Core.Entities;
using backend.Core.Dtos;
using backend.Core.Interfaces;

namespace backend.Core.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepository;

        public TaskService(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        public async Task<TaskClientResponse> CreateTaskAsync(CreateTaskDto dto, Guid userId)
        {
            var task = new TaskItem
            {
                Id = Guid.NewGuid(),
                Title = dto.Title,
                Description = dto.Description,
                DueDate = dto.DueDate,
                Status = TaskStatusItems.Pending,
                CreatedByUserId = userId
            };

            var createdTask = await _taskRepository.CreateAsync(task);

            return MapToResponse(createdTask);
        }

        public async Task<IEnumerable<TaskClientResponse>> GetUserTasksAsync(Guid userId, TaskStatusItems? status = null, DateTime? dueDate = null)
        {
            var tasks = await _taskRepository.GetUsersTasksAsync(userId, status, dueDate);
            return tasks.Select(MapToResponse);
        }

        public async Task<TaskClientResponse?> GetTaskByIdAsync(Guid taskId, Guid userId)
        {
            var task = await _taskRepository.GetTasksByIdAsync(taskId, userId);
            return task == null ? null : MapToResponse(task);
        }

        public async Task<bool> UpdateTaskAsync(Guid taskId, UpdateTaskDto dto, Guid userId)
        {
            var task = await _taskRepository.GetTasksByIdAsync(taskId, userId);
            if (task == null)
                return false;

            task.Title = dto.Title ?? task.Title;
            task.Description = dto.Description ?? task.Description;
            task.DueDate = dto.DueDate ?? task.DueDate;
            task.Status = dto.Status ?? task.Status;

            return await _taskRepository.UpdateAsync(task);
        }

        public async Task<bool> DeleteTaskAsync(Guid taskId, Guid userId)
        {
            var task = await _taskRepository.GetTasksByIdAsync(taskId, userId);
            if (task == null)
                return false;

            return await _taskRepository.DeleteAsync(task);
        }

        private TaskClientResponse MapToResponse(TaskItem task) =>
            new TaskClientResponse
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                DueDate = task.DueDate,
                Status = task.Status
            };
    }
}
