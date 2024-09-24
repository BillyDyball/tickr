using StackExchange.Redis;

namespace TickrApi.Models;

// https://stackoverflow.com/questions/36161600/using-redis-with-signalr
// https://redis.io/learn/develop/dotnet/streams/stream-basics#start-redis
// _db.StreamCreateConsumerGroupAsync

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