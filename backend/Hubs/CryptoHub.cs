using System.Text.Json;
using Microsoft.AspNetCore.SignalR;
using TickrApi.Models;

namespace TickrApi.Hubs
{
    // Keeps track of connected users
    public static class UserHandler
    {
        public static HashSet<string> ConnectedIds = new HashSet<string>();
    }

    public class CryptoHub : Hub
    {
        private readonly RedisService _redisService;

        public CryptoHub(RedisService redisService)
        {
            _redisService = redisService;
        }

        public override Task OnConnectedAsync()
        {
            UserHandler.ConnectedIds.Add(Context.ConnectionId);
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            UserHandler.ConnectedIds.Remove(Context.ConnectionId);
            return base.OnDisconnectedAsync(exception);
        }

        public async Task SendPriceUpdates(string symbol)
        {
            string? prevMessage = null;
            while (UserHandler.ConnectedIds.Count > 0)
            {
                var cryptoMessage = _redisService.GetCryptoMessage(symbol);
                var message = JsonSerializer.Serialize(cryptoMessage);
                if (message != null && message != prevMessage)
                {
                    await Clients.All.SendAsync(symbol, message);
                    prevMessage = message;
                }
            }
        }
    }
}