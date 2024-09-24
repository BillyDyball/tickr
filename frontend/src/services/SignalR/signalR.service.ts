import * as SignalR from "@microsoft/signalr";

export class SignalRConnection {
  private connection: SignalR.HubConnection;

  constructor() {
    this.connection = new SignalR.HubConnectionBuilder()
      .withUrl("https://localhost:7140/chatHub")
      .build();
    console.log(this.connection);
    this.registerHandlers();
    this.startConnection();
  }

  private startConnection(): this {
    this.connection
      .start()
      .catch((e) => console.error("Something went wrong", e));
    return this;
  }

  private registerHandlers(): this {
    this.connection.on("ReceiveMessage", (user: string, message: string) => {
      console.log(`${user} says ${message}`);
    });
    return this;
  }

  sendMessage(user: string, message: string): this {
    this.connection
      .invoke("SendMessage", user, message)
      .catch((e) => console.error(e));
    return this;
  }
}
