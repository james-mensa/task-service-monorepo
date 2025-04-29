using backend.Core.Entities;
using backend.Core.Interfaces;
using backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Infrastructure.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public TaskRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<TaskItem> CreateAsync(TaskItem task)
        {
            _dbContext.Tasks.Add(task);
            await _dbContext.SaveChangesAsync();
            return task;
        }

        public async Task<IEnumerable<TaskItem>> GetUsersTasksAsync(Guid userId, TaskStatusItems? status = null, DateTime? dueDate = null)
        {
            var query = _dbContext.Tasks.AsQueryable().Where(t => t.CreatedByUserId == userId);

            if (status.HasValue)
                query = query.Where(t => t.Status == status.Value);

            if (dueDate.HasValue)
                query = query.Where(t => t.DueDate.Date == dueDate.Value.Date);

            return await query.ToListAsync();
        }

        public async Task<TaskItem?> GetTasksByIdAsync(Guid taskId, Guid userId)
        {
            return await _dbContext.Tasks.FirstOrDefaultAsync(t => t.Id == taskId && t.CreatedByUserId == userId);
        }

        public async Task<bool> UpdateAsync(TaskItem task)
        {
            _dbContext.Tasks.Update(task);
            return await _dbContext.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteAsync(TaskItem task)
        {
            _dbContext.Tasks.Remove(task);
            return await _dbContext.SaveChangesAsync() > 0;
        }
    }
}
