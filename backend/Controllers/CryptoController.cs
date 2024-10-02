using System.Net.Http.Headers;
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
        private readonly static HttpClient client = new HttpClient();
        private readonly RedisService _redisService;
        private readonly IConfiguration _configuration;

        public CryptoController(RedisService service, IConfiguration configuration)
        {
            _redisService = service;
            _configuration = configuration;
            var key = _configuration[CYRPTO_KEY_CONFIG_VAR];
            if (key == null)
            {
                throw new Exception("Cannot access crypto api key, set a key using the 'dotnet user-secrets set CryptoKey <YOUR_KEY_HERE>' command");
            };
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("apikey", key);
        }

        [Route("tickers")]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ApiResponse<IEnumerable<CryptoTicker>>> GetTickers(int? page, int? pageSize, string? ticker)
        {
            var query = HttpUtility.ParseQueryString(string.Empty);
            query["page"] = page.ToString();
            query["page_size"] = pageSize.ToString();
            query["ticker"] = ticker;

            var request = $"https://api.finazon.io/latest/gate/gate/tickers?{query}";
            HttpResponseMessage response = await client.GetAsync(request);

            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadFromJsonAsync<ApiResponse<IEnumerable<CryptoTicker>>>();
                return json;
            }
            else
            {
                string message = await response.Content.ReadAsStringAsync();
                throw new Exception(message);
            }
        }

        [Route("price")]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<CryptoPrice> GetPrice(string ticker, int? at)
        {
            var query = HttpUtility.ParseQueryString(string.Empty);
            query["ticker"] = ticker;
            query["at"] = at.ToString();

            var request = $"https://api.finazon.io/latest/gate/gate/price?{query}";
            HttpResponseMessage response = await client.GetAsync(request);

            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadFromJsonAsync<CryptoPrice>();
                return json;
            }
            else
            {
                string message = await response.Content.ReadAsStringAsync();
                throw new Exception(message);
            }
        }

        [Route("timeSeries")]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ApiDataResponse<IEnumerable<CryptoTimeSeries>>> GetTimeSeries(string ticker, string interval, string? order, int? startAt, int? endAt, int? page, int? pageSize)
        {
            var query = HttpUtility.ParseQueryString(string.Empty);
            query["ticker"] = ticker;
            query["interval"] = interval;
            query["order"] = order;
            query["startAt"] = startAt.ToString();
            query["endAt"] = endAt.ToString();
            query["page"] = page.ToString();
            query["pageSize"] = pageSize.ToString();

            var request = $"https://api.finazon.io/latest/gate/gate/time_series?{query}";
            HttpResponseMessage response = await client.GetAsync(request);

            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadFromJsonAsync<ApiDataResponse<IEnumerable<CryptoTimeSeries>>>();
                return json;
            }
            else
            {
                string message = await response.Content.ReadAsStringAsync();
                throw new Exception(message);
            }
        }

        [Route("tickerSnapshot")]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<CryptoTickerSnapshot> GetTickerSnapshot(string ticker, string? country)
        {
            var query = HttpUtility.ParseQueryString(string.Empty);
            query["ticker"] = ticker;
            query["country"] = country;

            var request = $"https://api.finazon.io/latest/gate/gate/ticker_snapshot?{query}";
            HttpResponseMessage response = await client.GetAsync(request);

            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadFromJsonAsync<CryptoTickerSnapshot>();
                return json;
            }
            else
            {
                string message = await response.Content.ReadAsStringAsync();
                throw new Exception(message);
            }
        }

        [Route("ping")]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<string> Ping()
        {
            Console.WriteLine("Pong");
            return "Pong";
        }
    }
}
