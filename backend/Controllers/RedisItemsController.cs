using Microsoft.AspNetCore.Mvc;
using TickrApi.Models;

namespace Tickr.Controllers
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
    }
}
