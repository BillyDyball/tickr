using Microsoft.AspNetCore.Mvc;
using TickrApi.Models;

namespace ReferenceConsoleRedisApp.Controllers
{
    [Route("api/Redis")]
    [ApiController]
    public class RedisItemsController : ControllerBase
    {
        private readonly RedisService _redisService;

        public RedisItemsController(RedisService service)
        {
            _redisService = service;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> RedisPing()
        {
            await _redisService.Ping();
            return NoContent();
        }

        private static TodoItemDTO ItemToDTO(TodoItem todoItem) =>
        new TodoItemDTO
        {
            Id = todoItem.Id,
            Name = todoItem.Name,
            IsComplete = todoItem.IsComplete
        };
    }
}
