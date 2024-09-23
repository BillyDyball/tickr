using StackExchange.Redis;

namespace TickrApi.Models;

public class RedisService
{
    private readonly IDatabase _db;

    public RedisService(IConnectionMultiplexer multiplexer)
    {
        _db = multiplexer.GetDatabase();
    }

    public Task Ping()
    {
        Console.WriteLine("Redis Ping");
        _db.Ping();
        return Task.Delay(1000);
    }
}