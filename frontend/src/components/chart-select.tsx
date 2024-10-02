import { ObjectValues } from "@/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CandlestickChartIcon, LineChart } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const CHART_TYPES = {
  LINE: "line",
  CANDLE: "candle",
} as const;

type ChartType = ObjectValues<typeof CHART_TYPES>;

const getChartTypeName = (type: ChartType): string => {
  switch (type) {
    case CHART_TYPES.LINE:
      return "Line Chart";
    case CHART_TYPES.CANDLE:
      return "Candle Chart";
  }
};

export function ChartSelect() {
  const [selected, setSelected] = useState<ChartType>(CHART_TYPES.LINE);

  return (
    <Select
      value={selected}
      onValueChange={(value) => setSelected(value as ChartType)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={CHART_TYPES.LINE}>
            <div className="flex items-center gap-2">
              <LineChart
                className={cn(
                  "h-4 w-4",
                  selected === CHART_TYPES.LINE ? "text-sky-400" : ""
                )}
              />
              {getChartTypeName(CHART_TYPES.LINE)}
            </div>
          </SelectItem>
          <SelectItem value={CHART_TYPES.CANDLE}>
            <div className="flex items-center gap-2">
              <CandlestickChartIcon
                className={cn(
                  "h-4 w-4",
                  selected === CHART_TYPES.CANDLE ? "text-sky-400" : ""
                )}
              />
              {getChartTypeName(CHART_TYPES.CANDLE)}
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
