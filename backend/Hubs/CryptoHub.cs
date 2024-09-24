using Microsoft.AspNetCore.SignalR;

namespace TickrApi.Hubs
{
    public class CryptoHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}