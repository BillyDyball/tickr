import Layout from "@/components/layout";
import { cryptoService, Interval, TimeSeries } from "@/services";
import { useEffect, useMemo, useState } from "react";

import { ChartSelect } from "@/components/chart-select";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/checkbox";
import { Button } from "@/components/ui/button";
import { CircleIcon } from "@/components/circle-icon";
import {
  ArrowUpDownIcon,
  BitcoinIcon,
  ChevronDown,
  ChevronRightIcon,
  ChevronUp,
  DollarSign,
  EthernetPortIcon,
  MoreHorizontal,
  TerminalIcon,
} from "lucide-react";

import { GradientCircle } from "@/components/GradientCircle";
import "chart.js/auto";
import {
  Timeframe,
  TimeframeButtonGroup,
  TIMEFRAMES,
} from "@/components/timeframe-button-group";
import { BulletPoints } from "@/components/bullet-points";
import { TickerChart } from "@/components/ticker-chart";
import { formatPrice } from "@/utils";
import Gradient from "@/assets/bg-gradient.png";

export function Home() {
  // const { data, isLoading } = useTickerSnapshot("BTC/USDT", {
  //   refetchInterval: 30000,
  // });
  const [timeSeries, setTimeSeries] = useState<TimeSeries[]>([]);
  const [timeframe, setTimeframe] = useState<Timeframe>(TIMEFRAMES.DAY);

  const currentPrice = useMemo(() => {
    if (timeSeries.length > 0) {
      return formatPrice(timeSeries[timeSeries.length - 1].c);
    }
    return 0;
  }, [timeSeries]);

  const onLiveMode = (message: string) => {
    console.log("message", message);
    const series = JSON.parse(message) as TimeSeries | null;
    if (series === null) return;

    setTimeSeries((prev) => {
      if (prev.length > 0) {
        const last = prev[prev.length - 1];
        if (last.t === series.t) {
          // Replace the last element with the new series
          return [...prev.slice(0, prev.length - 1), series];
        }
      }
      // Remove the first element and add the new series
      return [...prev.slice(1), series];
    });
  };

  const handleTimeframeChange = async (timeframe: Timeframe) => {
    let interval: Interval | null = null;
    let startAt: number | null = null;
    // Unix timestamp in seconds
    const endAt = Math.floor(Date.now() / 1000);

    switch (timeframe) {
      case "LIVE":
        interval = "1m";
        // 30 minutes
        startAt = Math.floor(endAt - 60 * 30);
        break;
      case "D":
        interval = "1h";
        // 24 hours
        startAt = Math.floor(endAt - 60 * 60 * 24);
        break;
      case "W":
        interval = "1d";
        // 7 days
        startAt = Math.floor(endAt - 60 * 60 * 24 * 7);
        break;
      case "M":
        interval = "1d";
        // 30 days
        startAt = Math.floor(endAt - 60 * 60 * 24 * 30);
        break;
      case "Y":
        interval = "1mo";
        // 12 months
        startAt = Math.floor(endAt - 60 * 60 * 24 * 365);
        break;
    }

    if (interval === null || startAt === null) {
      console.error("Invalid timeframe");
      return;
    }

    // Start the connection for live mode
    if (timeframe === TIMEFRAMES.LIVE) {
      cryptoService.startConnection(() => {
        cryptoService.connection.invoke("SendPriceUpdates", "BTC/USDT");
      });
      cryptoService.connection.on("BTC/USDT", onLiveMode);
    } else {
      cryptoService.connection.off("BTC/USDT", onLiveMode);
      cryptoService.stopConnection();
    }

    const timeSeries = await cryptoService.getTimeSeries({
      ticker: "BTC/USDT",
      interval,
      startAt,
      endAt,
    });
    setTimeSeries(timeSeries);
    setTimeframe(timeframe);
  };

  useEffect(() => {
    handleTimeframeChange(TIMEFRAMES.DAY);
  }, []);

  return (
    <Layout>
      <div className="flex flex-wrap relative h-full overflow-hidden text-white">
        <GradientCircle className="bg-sky-700 opacity-15 right-20 -bottom-20 h-1/2 w-1/2" />
        <div className="h-full w-full md:w-2/3 lg:10/12 border-r-none border-r-slate-700 md:border-r flex flex-col overflow-scroll gap-4 p-8">
          <div className="flex justify-between">
            <h1 className="text-4xl">BTC/USD</h1>
            <ChartSelect />
          </div>
          <div className="flex justify-between">
            <div>
              <h1 className="text-2xl">{currentPrice}</h1>
            </div>
            <TimeframeButtonGroup onChange={handleTimeframeChange} />
          </div>
          <div className="flex-1">
            <TickerChart
              series={timeSeries}
              type="line"
              timeframe={timeframe}
            />
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col flex-1 gap-2">
              <h2 className="text-2xl">Rewards</h2>
              <Card>
                <CardContent className="flex flex-col gap-4 p-4">
                  <div className="flex flex-col gap-1 text-white">
                    <Checkbox
                      checked
                      id="referral-code-reward"
                      label="Invite a friend using your referral code"
                      onChange={() => null}
                    />
                    <div className="pl-6 text-xs text-gray-400">
                      +10.00 USDT
                    </div>
                  </div>
                  <Separator />
                  <div className="flex flex-col gap-1 text-white">
                    <Checkbox
                      checked={false}
                      id="first-coin-reward"
                      label="Get your first coin"
                      onChange={() => null}
                    />
                    <div className="pl-6 text-xs text-gray-400">
                      50% bonus to your next deposit
                    </div>
                  </div>
                  <Separator />
                  <div className="flex flex-col gap-1 text-white">
                    <Checkbox
                      checked={false}
                      id="last-reward"
                      label="Get your first coin"
                      onChange={() => null}
                    />
                    <div className="pl-6 text-xs text-gray-400">
                      50% bonus to your next deposit
                    </div>
                  </div>
                  <Button variant={"outline"} className="mt-4">
                    Get a reward
                  </Button>
                </CardContent>
              </Card>
            </div>
            <div className="flex flex-col flex-1 gap-4">
              <h2 className="text-2xl">Transactions</h2>
              <Card className="bg-transparent">
                <CardContent className="flex flex-col gap-3 p-0 pr-4">
                  <div className="flex gap-2 text-white">
                    <CircleIcon icon={BitcoinIcon} color="#e28e2a" />
                    <div className="flex flex-1 justify-between">
                      <div>
                        <p>Bitcoin</p>
                        <p className="text-gray-400 text-xs">Buy</p>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400">+0.45 BTC</p>
                        <p className="text-gray-400 text-xs">01:45 PM</p>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex gap-2 text-white">
                    <CircleIcon icon={EthernetPortIcon} color="#eeeff0" />
                    <div className="flex flex-1 justify-between">
                      <div>
                        <p>Ethereum</p>
                        <p className="text-gray-400 text-xs">Buy</p>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400">+5.00 ETH</p>
                        <p className="text-gray-400 text-xs">01:45 PM</p>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex gap-2 text-white">
                    <CircleIcon icon={TerminalIcon} color="#65ddbc" />
                    <div className="flex flex-1 justify-between">
                      <div>
                        <p>Tether</p>
                        <p className="text-gray-400 text-xs">Buy</p>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400">+2500.00 USDT</p>
                        <p className="text-gray-400 text-xs">01:45 PM</p>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex gap-2 text-white">
                    <CircleIcon icon={TerminalIcon} color="#a041c1" />
                    <div className="flex flex-1 justify-between">
                      <div>
                        <p>Solana</p>
                        <p className="text-gray-400 text-xs">Buy</p>
                      </div>
                      <div className="text-right">
                        <p className="text-red-400">-2.70 SOL</p>
                        <p className="text-gray-400 text-xs">01:45 PM</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-end gap-2 ml-auto">
                    <p className="text-gray-400 text-sm">See more</p>
                    <ChevronRightIcon size={16} className="text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <div className="h-full w-full md:w-1/3 lg:2/12 flex flex-col overflow-scroll gap-4 p-8">
          <Card>
            <CardContent className="flex flex-col gap-4 p-6">
              <div className="flex justify-between">
                <p>Total balance</p>
                <CircleIcon
                  icon={MoreHorizontal}
                  size={14}
                  className="p-1"
                  color="#ffffff"
                />
              </div>
              <div className="flex justify-between">
                <p className="text-2xl">$78,820.00</p>
                <div className="flex items-center gap-1 text-green-400">
                  <ChevronUp size={16} />
                  <p>$931.12</p>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between">
                <p>Exchange</p>
                <p>1 BTC = $30,834.00</p>
              </div>
              <div className="relative">
                <CircleIcon
                  icon={ArrowUpDownIcon}
                  color="#000000"
                  size={20}
                  className="!bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3"
                />
                <div className="flex justify-between rounded-t-2xl bg-slate-800 p-4">
                  <p>You sell</p>
                  <div className="flex items-center">
                    <BitcoinIcon className="text-[#e38e29]" />
                    <p>BTC</p>
                    <CircleIcon
                      size={14}
                      icon={ChevronDown}
                      color="#ffffff"
                      className="p-0.5 ml-4"
                    />
                  </div>
                </div>
                <Separator className="bg-slate-900" />
                <div className="flex justify-between rounded-b-2xl bg-slate-800 p-4">
                  <p>You Get</p>
                  <div className="flex items-center">
                    <DollarSign className="text-[#65ddbc]" />
                    <p>USDT</p>
                    <CircleIcon
                      size={14}
                      icon={ChevronDown}
                      color="#ffffff"
                      className="p-0.5 ml-4"
                    />
                  </div>
                </div>
              </div>
              <Button
                variant={"default"}
                size={"lg"}
                className="mt-4 bg-gradient-to-r from-cyan-500 to-blue-500"
              >
                Exchange
              </Button>
            </CardContent>
          </Card>
          <div className="flex flex-col gap-2">
            <p className="text-2xl">Ai Tips</p>
            <Card>
              <CardContent className="flex flex-col gap-4 p-6">
                <BulletPoints
                  points={[
                    "Follow News and market analysis to understand what events may affect asset prices",
                    "Create a trading plan that includes goals",
                  ]}
                />
              </CardContent>
            </Card>
          </div>
          <Card
            style={{
              backgroundImage: `url(${Gradient})`,
            }}
          >
            <CardContent className="flex flex-col gap-4 p-6" style={{}}>
              <p className="text-2xl">Premium Plan</p>
              <p className="w-2/3">
                Upgrade your plan to Premium and get unlimited access
              </p>
              <Button
                variant={"default"}
                size={"lg"}
                className="bg-white text-black"
              >
                Upgrade Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
