using System.Web;
using Microsoft.AspNetCore.Mvc;
using Tickr.Models;
using TickrApi.Models;

namespace Tickr.Controllers
{
    [Route("api/Crypto")]
    [ApiController]
    public class CryptoController : ControllerBase
    {
        private const string CYRPTO_KEY_CONFIG_VAR = "CryptoKey";
        private readonly static HttpClient client = new()
        {
            BaseAddress = new Uri("https://api.finazon.io/latest/gate/gate")
        };
        private readonly RedisService _redisService;

        public CryptoController(RedisService service, IConfiguration Configuration)
        {
            _redisService = service;
            var key = Configuration[CYRPTO_KEY_CONFIG_VAR];
            if (key == null)
            {
                throw new Exception("Cannot access crypto api key, set a key using the 'dotnet user-secrets set CryptoKey <YOUR_KEY_HERE>' command");
            };
            Console.WriteLine("key", key);
            client.DefaultRequestHeaders.Add("Authorization", "apikey <YOUR_KEY_HERE>");
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ApiResponse<IEnumerable<Ticker>>> GetTickers(int? page, int? pageSize, string? ticker)
        {
            var query = HttpUtility.ParseQueryString(string.Empty);
            query["page"] = page.ToString();
            query["page_size"] = pageSize.ToString();
            query["ticker"] = ticker;

            var request = query.ToString();

            HttpResponseMessage response = await client.GetAsync($"https://api.finazon.io/latest/gate/gate/tickers?page_size=1000");

            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadFromJsonAsync<ApiResponse<IEnumerable<Ticker>>>();
                return json;
            }
            else
            {
                string message = await response.Content.ReadAsStringAsync();
                Console.WriteLine(message);
                throw new Exception(message);
            }
        }

        // [HttpGet]
        // [ProducesResponseType(StatusCodes.Status201Created)]
        // public async Task<IActionResult> RedisPing()
        // {
        //     await _redisService.Ping();
        //     return NoContent();
        // }
    }
}
