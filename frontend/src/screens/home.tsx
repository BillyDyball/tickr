import Layout from "@/components/layout";
import { useTickerSnapshot } from "@/hooks/useCryptoSnapshot";
import { cryptoService } from "@/services";
import { useEffect } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CHART_TYPES = {
  LINE: "line",
  CANDLE: "candle",
} as const;

type ObjectValues<T> = T[keyof T];
type ChartType = ObjectValues<typeof CHART_TYPES>;

const getChartTypeName = (type: ChartType): string => {
  switch (type) {
    case CHART_TYPES.LINE:
      return "Line Chart";
    case CHART_TYPES.CANDLE:
      return "Candle Chart";
  }
};

export function Home() {
  // const { data, isLoading } = useTickerSnapshot("BTC/USDT", {
  //   refetchInterval: 30000,
  // });

  const fetchPing = async () => {
    await cryptoService.ping();
  };

  useEffect(() => {
    fetchPing();
  }, []);

  return (
    <Layout>
      <div className="flex h-full text-white">
        <div className="w-full md:w-2/3 lg:w-3/5 border-r-none border-r-slate-700 md:border-r p-4">
          <div className="flex justify-between">
            <h4>BTC/USD</h4>
            <Select value={CHART_TYPES.LINE}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={CHART_TYPES.LINE}>
                    {getChartTypeName(CHART_TYPES.LINE)}
                  </SelectItem>
                  <SelectItem value={CHART_TYPES.CANDLE}>
                    {getChartTypeName(CHART_TYPES.CANDLE)}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="w-full md:w-2/3 lg:w-3/5"></div>
      </div>
    </Layout>
  );
}
