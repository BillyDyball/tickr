import Layout from "@/components/layout";
import { useTickerSnapshot } from "@/hooks/useCryptoSnapshot";
import { cryptoService, Interval, TimeSeries } from "@/services";
import { useEffect, useState } from "react";

import { ChartSelect } from "@/components/chart-select";
import { ButtonGroup } from "@/components/button-group";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/checkbox";
import { Button } from "@/components/ui/button";
import { CircleIcon } from "@/components/circle-icon";
import {
  BitcoinIcon,
  ChevronRightIcon,
  EthernetPortIcon,
  TerminalIcon,
} from "lucide-react";

import { ChartProps, Line } from "react-chartjs-2";
import { GradientCircle } from "@/components/GradientCircle";
import "chart.js/auto";
import {
  Timeframe,
  TimeframeButtonGroup,
  TIMEFRAMES,
} from "@/components/timeframe-button-group";
import { it } from "node:test";

// Last 7 months
const labels = ["January", "February", "March", "April", "May", "June", "July"];
const data: ChartProps<"line">["data"] = {
  labels: labels,
  datasets: [
    {
      data: [28, 48, 40, 19, 86, 27, 90],
      borderColor: "rgb(56, 189, 248)",
      backgroundColor(ctx) {
        const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, "rgba(37, 148, 198,1)");
        gradient.addColorStop(0.5, "rgba(37, 148, 198,0)");

        return gradient;
      },
      pointRadius: 0,
      borderJoinStyle: "round",
      tension: 0.4,
      fill: true,
    },
  ],
};

export function Home() {
  // const { data, isLoading } = useTickerSnapshot("BTC/USDT", {
  //   refetchInterval: 30000,
  // });
  const [timeSeries, setTimeSeries] = useState<TimeSeries[]>([]);

  const fetchPing = async () => {
    await cryptoService.ping();
  };

  const handleTimeframeChange = async (timeframe: Timeframe) => {
    let interval: Interval | null = null;
    let startAt: number | null = null;
    // Unix timestamp in seconds
    const endAt = Math.floor(Date.now()) / 1000;

    switch (timeframe) {
      case "D":
        interval = "1h";
        startAt = endAt - 60 * 60 * 24;
        break;
      case "W":
        interval = "1d";
        startAt = Date.now() - 60 * 60 * 24 * 7;
        break;
      case "M":
        interval = "1d";
        startAt = Date.now() - 60 * 60 * 24 * 30;
        break;
      case "Y":
        interval = "1m";
        startAt = Date.now() - 60 * 60 * 24 * 365;
        break;
    }

    if (interval === null || startAt === null) {
      console.error("Invalid timeframe");
      return;
    }

    const timeSeries = await cryptoService.getTimeSeries({
      ticker: "BTC/USDT",
      interval,
      startAt,
      endAt,
    });
    setTimeSeries(timeSeries);
  };

  useEffect(() => {
    handleTimeframeChange(TIMEFRAMES.DAY);
  }, []);

  return (
    <Layout>
      <div className="flex flex-wrap relative h-full overflow-hidden text-white">
        <GradientCircle className="bg-sky-700 opacity-15 right-20 -bottom-20 h-1/2 w-1/2" />
        <div className="w-full md:w-2/3 lg:w-3/5 border-r-none border-r-slate-700 md:border-r flex flex-col overflow-scroll gap-4 p-4">
          <div className="flex justify-between">
            <h1 className="text-4xl">BTC/USD</h1>
            <ChartSelect />
          </div>
          <div className="flex justify-between">
            <div>
              <h1 className="text-2xl">$16,430.00</h1>
            </div>
            <TimeframeButtonGroup onChange={handleTimeframeChange} />
          </div>
          <div className="flex-1">
            <Line
              data={data}
              options={{ plugins: { legend: { display: false } } }}
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
        <div className="w-full md:w-1/3 lg:w-2/5"></div>
      </div>
    </Layout>
  );
}
