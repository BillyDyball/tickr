import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

export abstract class SignalRConnection {
  connection: HubConnection;

  constructor(endpoint: string) {
    this.connection = new HubConnectionBuilder()
      .withUrl(`https://localhost:7140/${endpoint}`)
      .build();
  }

  startConnection(startCallback?: () => void): this {
    this.connection
      .start()
      .then(startCallback)
      .catch((e) => console.error("Something went wrong", e));
    return this;
  }

  stopConnection = (): this => {
    this.connection.stop();
    return this;
  };
}
