import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

export abstract class SignalRConnection {
  private connection: HubConnection;

  constructor(connectionEndpoint: string) {
    this.connection = new HubConnectionBuilder()
      .withUrl(`https://localhost:7140/${connectionEndpoint}`)
      .build();
    this.registerHandlers(this.connection);
    this.startConnection();
  }

  abstract registerHandlers(connection: HubConnection): this;

  private startConnection(): this {
    this.connection
      .start()
      .catch((e) => console.error("Something went wrong", e));
    return this;
  }
}
