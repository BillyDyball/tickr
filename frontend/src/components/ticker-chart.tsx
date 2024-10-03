import { TimeSeries } from "@/services";
import { useMemo } from "react";
import { ChartProps, Line } from "react-chartjs-2";
import { Timeframe, TIMEFRAMES } from "./timeframe-button-group";
import moment from "moment";
import { findMidpoint } from "@/utils";

interface TickerChartProps {
  series: TimeSeries[];
  type: "line" | "candle";
  timeframe: Timeframe;
}

export function TickerChart({ series, timeframe, type }: TickerChartProps) {
  const labels = useMemo<string[]>(
    () =>
      series.map(({ t }, index) => {
        const unix = t * 1000;

        switch (timeframe) {
          case TIMEFRAMES.LIVE:
            if (index % 4 === 0) return moment(unix).format("h:mm A");
            return "";
          case TIMEFRAMES.DAY:
            if (index % 3 === 0) return moment(unix).format("h A");
            return "";
          case TIMEFRAMES.WEEK:
            return moment(unix).format("ddd");
          case TIMEFRAMES.MONTH:
            return moment(unix).format("D");
          case TIMEFRAMES.YEAR:
            return moment(unix).format("MMM");
        }
      }),
    [series, timeframe]
  );

  const data = useMemo<ChartProps<"line">["data"]>(
    () => ({
      labels: labels,
      datasets: [
        {
          data: series.map(({ c, o }) => findMidpoint(c, o)),
          borderColor: "rgb(56, 189, 248)",
          backgroundColor(ctx) {
            const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, "rgba(37, 148, 198, 1)");
            gradient.addColorStop(0.25, "rgba(37, 148, 198, 0.3)");
            gradient.addColorStop(0.5, "rgba(37, 148, 198, 0.1)");
            gradient.addColorStop(0.8, "rgba(37, 148, 198, 0)");

            return gradient;
          },
          pointRadius: 0,
          borderJoinStyle: "round",
          tension: 0.4,
          fill: true,
        },
      ],
    }),
    [series]
  );

  const options = useMemo<ChartProps<"line">["options"]>(
    () => ({ plugins: { legend: { display: false } }, responsive: true }),
    []
  );

  return <Line data={data} options={options} className="w-full" />;
}
