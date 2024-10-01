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

    // Make this streams
    public async Task PushData(string key, string value)
    {
        await _db.StringSetAsync(key, value);
    }

    public async Task<string> GetData(string key)
    {
        return await _db.StringGetAsync(key);
    }
}