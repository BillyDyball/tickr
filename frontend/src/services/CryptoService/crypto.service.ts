import { handleServiceError } from "@/utils";
import {
  interval,
  Ticker,
  TickerPrice,
  TickerSnapshot,
  TimeSeries,
} from "./crypto.types";
import { AxiosInstance } from "axios";
import { Order } from "@/types";
import { SignalRConnection } from "../SignalR/signalR.service";
import { HubConnection } from "@microsoft/signalr";

export class CryptoService extends SignalRConnection {
  private http: AxiosInstance;
  private readonly endpoint = "api/Crypto";

  constructor(http: AxiosInstance) {
    super("hubs/crypto", () => {
      this.connection.invoke("SendPriceUpdates", "BTC/USDT");
    });
    this.http = http;
  }

  registerHandlers(connection: HubConnection): this {
    connection.on("BTC/USDT", (message: string) => {
      console.log(`Recieved: ${message}`);
    });
    return this;
  }

  getTickers = async (params?: {
    page?: number;
    pageSize?: number;
    ticker?: string;
  }): Promise<Ticker[]> => {
    try {
      const response = await this.http.get<Ticker[]>(
        `${this.endpoint}/tickers`,
        { params }
      );
      return response.data;
    } catch (e) {
      throw handleServiceError(e, "getTickers");
    }
  };

  getPrice = async (params: { ticker: string }): Promise<TickerPrice> => {
    try {
      const response = await this.http.get<TickerPrice>(
        `${this.endpoint}/price`,
        { params }
      );
      return response.data;
    } catch (e) {
      throw handleServiceError(e, "getPrice");
    }
  };

  getTimeSeries = async (params: {
    ticker: string;
    interval: interval;
    order?: Order;
    startAt?: number;
    endAt?: number;
    page?: number;
    pageSize: number;
  }): Promise<TimeSeries> => {
    try {
      const response = await this.http.get<TimeSeries>(
        `${this.endpoint}/timeSeries`,
        { params }
      );
      return response.data;
    } catch (e) {
      throw handleServiceError(e, "getTimeSeries");
    }
  };

  getTickerSnapshot = async (params: {
    ticker: string;
    country?: string;
  }): Promise<TickerSnapshot> => {
    try {
      const response = await this.http.get<TickerSnapshot>(
        `${this.endpoint}/tickerSnapshot`,
        { params }
      );
      return response.data;
    } catch (e) {
      throw handleServiceError(e, "getTickerSnapshot");
    }
  };

  ping = async (): Promise<void> => {
    try {
      const response = await this.http.get<string>(`${this.endpoint}/ping`);
      console.log(response);
    } catch (e) {
      throw handleServiceError(e, "ping");
    }
  };
}
