## Tickr

// Tutorial => https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-8.0&tabs=visual-studio-code
// Example project => https://github.com/saiwolf/todo-list-spa/tree/main

// Backend cmds

Launch api - dotnet run
Launch api https - dotnet run --launch-profile https

Setup Backend

To set up the backend a secret will have to be added to know where to locate the redis database and the password to authenticate with redis.

Run this command and replace `<YOUR_CONNECTION_STRING_HERE>` with your own connection string `dotnet user-secrets set ConnectionString <YOUR_CONNECTION_STRING_HERE>`
