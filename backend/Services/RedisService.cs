using System.Text.Json;
using StackExchange.Redis;

namespace TickrApi.Models;

// https://stackoverflow.com/questions/36161600/using-redis-with-signalr
// https://redis.io/learn/develop/dotnet/streams/stream-basics#start-redis
// _db.StreamCreateConsumerGroupAsync

public class RedisService
{
    private readonly IDatabase _db;
    private readonly ISubscriber _subscriber;

    public RedisService(IConnectionMultiplexer multiplexer)
    {
        _db = multiplexer.GetDatabase();
        _subscriber = multiplexer.GetSubscriber();
    }

    // Make this streams
    public async Task PushCryptoMessage(CryptoMessage value)
    {
        // Remove the old key and add a new one
        _db.KeyDelete(value.S);
        _db.StreamAdd(value.S, new NameValueEntry[] {
            new NameValueEntry("data", JsonSerializer.Serialize(value)),
        }, null, null, false);
    }

    public CryptoMessage GetCryptoMessage(string key)
    {
        StreamEntry[] stream = _db.StreamRead(key, 0, 1);

        if (stream.Length > 0)
        {
            var message = JsonSerializer.Deserialize<CryptoMessage>(stream[0].Values[0].Value);
            return message;
        }
        return null;
    }
}