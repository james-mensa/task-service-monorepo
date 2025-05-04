using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.Core.Dtos;
using backend.Core.Interfaces;
using backend.Core.Entities;
using System.Security.Claims;

namespace backend.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }

    
        [HttpGet]
        public async Task<IActionResult> GetTasks([FromQuery] TaskStatusItems? status, [FromQuery] DateTime? dueDate)
        {
            var userId = GetUserId();
            var tasks = await _taskService.GetUserTasksAsync(userId, status, dueDate);
            return Ok(tasks);
        }

     
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTaskById(Guid id)
        {
            var userId = GetUserId();
            var task = await _taskService.GetTaskByIdAsync(id, userId);
            if (task == null)
                return NotFound();
            return Ok(task);
        }

   
        [HttpPost]
        public async Task<IActionResult> CreateTask([FromBody] CreateTaskDto dto)
        {
            var userId = GetUserId();
            var createdTask = await _taskService.CreateTaskAsync(dto, userId);
            return CreatedAtAction(nameof(GetTaskById), new { id = createdTask.Id }, createdTask);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(Guid id, [FromBody] UpdateTaskDto dto)
        {
            var userId = GetUserId();
            var updated = await _taskService.UpdateTaskAsync(id, dto, userId);
            if (!updated)
                return NotFound();
            return NoContent();
        }

        // DELETE: api/tasks/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(Guid id)
        {
            var userId = GetUserId();
            var deleted = await _taskService.DeleteTaskAsync(id, userId);
            if (!deleted)
                return NotFound();
            return NoContent();
        }

        // Utility: Extract user ID from JWT
        private Guid GetUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return Guid.Parse(userIdClaim ?? throw new UnauthorizedAccessException("User ID not found in token"));
        }
    }
}
