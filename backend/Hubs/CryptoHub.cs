using System.Net.WebSockets;
using Microsoft.AspNetCore.SignalR;
using TickrApi.Models;

namespace TickrApi.Hubs
{
    public class CryptoHub : Hub
    {
        private readonly RedisService _redisService;

        public CryptoHub(RedisService redisService)
        {
            _redisService = redisService;
        }

        public async Task SendPriceUpdates(string symbol)
        {
            var price = await _redisService.GetData(symbol);
            await Clients.All.SendAsync("ReceivePrice", symbol, price);
        }
    }
}