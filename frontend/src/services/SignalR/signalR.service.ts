import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

export abstract class SignalRConnection {
  connection: HubConnection;

  constructor(
    connectionEndpoint: string,
    startConnectionCallback?: () => void
  ) {
    this.connection = new HubConnectionBuilder()
      .withUrl(`https://localhost:7140/${connectionEndpoint}`)
      .build();
    this.registerHandlers(this.connection);
    this.startConnection(startConnectionCallback);
  }

  abstract registerHandlers(connection: HubConnection): this;

  private startConnection(startCallback?: () => void): this {
    this.connection
      .start()
      .then(startCallback)
      .catch((e) => console.error("Something went wrong", e));
    return this;
  }
}
