namespace ReferenceConsoleRedisApp
{
    public class RedisKeyNotFoundException : Exception
    {
        public RedisKeyNotFoundException(string message) : base(message) { }
    }
}
