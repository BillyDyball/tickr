using Microsoft.OpenApi.Models;
using StackExchange.Redis;
using TickrApi.Models;
using TickrApi.Hubs;
using Tickr.Controllers;
using System.Net.WebSockets;

using System.Text;
using System.Text.Json;

namespace TickrApi.Program
{
    public class Startup
    {
        private IConfiguration _configuration { get; }
        private const string CYRPTO_KEY_CONFIG_VAR = "CryptoKey";
        private const string CONNECTION_STRING_CONFIG_VAR = "ConnectionString";
        private const string DEFAULT_CONNECTION_STRING = "localhost,abortConnect=false,ssl=false,allowAdmin=false,password=";
        public const string COOKIE_AUTH_SCHEME = "CookieAuthentication";

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            Console.WriteLine("Configure Services!");
            services.AddCors(options =>
            {
                var origins = _configuration.GetSection("Origins").Get<string[]>();
                options.AddPolicy("CorsPolicy",
                    policy =>
                    {
                        policy.WithOrigins(origins)
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .SetIsOriginAllowed((x) => true)
                            .AllowCredentials();
                    }
                );
            });
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Tickr API", Version = "v1" });
            });
            services.AddSignalR();

            var configConnectionString = _configuration[CONNECTION_STRING_CONFIG_VAR];
            string redisConnectionString =
                !string.IsNullOrEmpty(configConnectionString) ?
                    configConnectionString :
                    DEFAULT_CONNECTION_STRING;

            services.AddSingleton<IConnectionMultiplexer>(ConnectionMultiplexer.Connect(redisConnectionString));

            services.AddTransient<CryptoController>();
            services.AddTransient<RedisService>();
            services.AddTransient<CryptoHub>();

            var cryptoKey = _configuration[CYRPTO_KEY_CONFIG_VAR];
            // Start the internal websocket client
            ConnectToFinazonAsync(
                $"wss://ws.finazon.io/v1?apikey={cryptoKey}",
                ["BTC/USDT", "ETH/USDT"],
                new RedisService(ConnectionMultiplexer.Connect(redisConnectionString))
            );
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Tickr-preview v1"));
            }
            app.UseCors("CorsPolicy");
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthorization();
            app.UseAuthentication();

            app.Map(new PathString(""), client =>
            {
                app.UseEndpoints(endpoints =>
                {
                    endpoints.MapHub<CryptoHub>("/hubs/crypto");
                    endpoints.MapControllerRoute(name: "default", pattern: "{controller}/{action=Index}/{id?}");
                });
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        public async Task ConnectToFinazonAsync(string uri, string[] tickers, RedisService redisService)
        {
            using (ClientWebSocket webSocket = new ClientWebSocket())
            {
                // Connect to the WebSocket
                await webSocket.ConnectAsync(new Uri(uri), CancellationToken.None);
                Console.WriteLine("WebSocket connection established.");

                // Create the subscription object
                var subscriptionMessage = new
                {
                    @event = "subscribe",
                    dataset = "gate",
                    tickers,
                    channel = "bars",
                    frequency = "1s",
                    aggregation = "1m"
                };

                // Serialize the message into JSON
                string jsonMessage = JsonSerializer.Serialize(subscriptionMessage);

                // Send the subscription message
                var messageBuffer = Encoding.UTF8.GetBytes(jsonMessage);
                await webSocket.SendAsync(new ArraySegment<byte>(messageBuffer), WebSocketMessageType.Text, true, CancellationToken.None);
                Console.WriteLine("Subscription message sent.");

                // Buffer to receive messages
                byte[] buffer = new byte[1024 * 64];

                // Continuously receive messages from the WebSocket
                while (webSocket.State == WebSocketState.Open)
                {
                    WebSocketReceiveResult result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
                    string message = Encoding.UTF8.GetString(buffer, 0, result.Count);
                    Console.WriteLine($"Received: {message}");

                    if (message.Contains("status")) continue;

                    // Convert message to json object of type CryptoMessage
                    var cryptoMessage = JsonSerializer.Deserialize<CryptoMessage>(message);
                    await redisService.PushCryptoMessage(cryptoMessage);
                }
            }
        }
    }
}