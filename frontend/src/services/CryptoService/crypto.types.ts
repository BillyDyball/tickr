export type Interval =
  | "1m"
  | "2m"
  | "3m"
  | "4m"
  | "5m"
  | "10m"
  | "15m"
  | "20m"
  | "30m"
  | "45m"
  | "1h"
  | "2h"
  | "3h"
  | "4h"
  | "8h"
  | "12h"
  | "1d"
  | "1w"
  | "1mo"
  | "2mo"
  | "3mo"
  | "4mo";

export type Ticker = {
  publisher: string;
  ticker: string;
  imageURL?: string;
};

export type TickerPrice = {
  price: number;
};

export type TimeSeries = {
  t: number;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
};

export type TickerSnapshot = {
  "1d": {
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
  };
  "1m": {
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
  };
  "52w": {
    high: string;
    highTimestamp: number;
    lowTimestamp: number;
    low: string;
    changePrice: number;
    changePricePercent: number;
    averageVolume: number;
  };
  change: {
    dailyChangePercent: number;
    weeklyChangePercent: number;
    monthlyChangePercent: number;
  };
  lastTrade: {
    timestamp: number;
    price: string;
    shares: number;
  };
  previousDay: {
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
  };
};
