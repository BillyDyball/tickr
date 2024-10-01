using Microsoft.OpenApi.Models;
using StackExchange.Redis;
using TickrApi.Models;
using TickrApi.Hubs;
using Tickr.Controllers;

namespace TickrApi.Program
{
    public class Startup
    {
        private IConfiguration Configuration { get; }
        private const string CONNECTION_STRING_CONFIG_VAR = "ConnectionString";
        private const string DEFAULT_CONNECTION_STRING = "localhost,abortConnect=false,ssl=false,allowAdmin=false,password=";
        public const string COOKIE_AUTH_SCHEME = "CookieAuthentication";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            Console.WriteLine("Configure Services!");
            services.AddCors(options =>
            {
                var origins = Configuration.GetSection("Origins").Get<string[]>();
                options.AddDefaultPolicy(
                    policy =>
                    {
                        policy.WithOrigins(origins)
                        .AllowAnyMethod()
                        .AllowAnyHeader()
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

            var configConnectionString = Configuration[CONNECTION_STRING_CONFIG_VAR];
            string redisConnectionString =
                !string.IsNullOrEmpty(configConnectionString) ?
                    configConnectionString :
                    DEFAULT_CONNECTION_STRING;

            services.AddSingleton<IConnectionMultiplexer>(ConnectionMultiplexer.Connect(redisConnectionString));

            services.AddTransient<CryptoController>();
            services.AddTransient<RedisService>();
            services.AddTransient<ChatHub>();
            services.AddTransient<CryptoHub>();

            // services.AddAuthentication(COOKIE_AUTH_SCHEME)
            //     .AddCookie(COOKIE_AUTH_SCHEME, options =>
            //     {
            //         options.Cookie.Name = "redis.Authcookie";
            //         options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
            //         options.Cookie.SameSite = Microsoft.AspNetCore.Http.SameSiteMode.None;
            //         options.Events = new CookieAuthenticationEvents
            //         {
            //             OnRedirectToLogin = redirectContext =>
            //             {
            //                 redirectContext.HttpContext.Response.StatusCode = 401;
            //                 return Task.CompletedTask;
            //             }
            //         };
            //         options.ForwardDefaultSelector = ctx => COOKIE_AUTH_SCHEME;
            //     });
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
            app.UseCors();
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthorization();
            app.UseAuthentication();

            app.Map(new PathString(""), client =>
            {
                app.UseEndpoints(endpoints =>
                {
                    endpoints.MapHub<ChatHub>("/chatHub");
                    endpoints.MapControllerRoute(name: "default", pattern: "{controller}/{action=Index}/{id?}");
                });
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            // ThreadPool.QueueUserWorkItem(async (state) =>
            // {
            //     await SeedScript.SeedDatabase(
            //         app.ApplicationServices.GetService<BookService>(),
            //         app.ApplicationServices.GetService<UserService>(),
            //         app.ApplicationServices.GetService<CartService>());
            // });
        }
    }
}