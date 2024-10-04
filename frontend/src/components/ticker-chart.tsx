import { TimeSeries } from "@/services";
import { useMemo } from "react";
import { ChartProps, Line } from "react-chartjs-2";
import { Timeframe, TIMEFRAMES } from "./timeframe-button-group";
import moment from "moment";
import { findMidpoint, formatPrice, percentageDifference } from "@/utils";

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
            if (index % 7 === 0) return moment(unix).format("MMM Do");
            return "";
          case TIMEFRAMES.MONTH:
            if (index % 7 === 0) return moment(unix).format("Do");
            return "";
          case TIMEFRAMES.YEAR:
            console.log("unix", unix, moment(unix), series[index]);
            if (index % 4 === 0) return moment(unix).format("MMMM");
            return "";
        }
      }),
    [series, timeframe]
  );

  const data = useMemo<ChartProps<"line">["data"]>(
    () => ({
      labels: labels,
      datasets: [
        {
          indexAxis: "x",
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
    () => ({
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: false,
          yAlign: "bottom",
          callbacks: {
            title: () => "",
            label: (context) => {
              const value = context.parsed.y;
              const prevValue = series[context.dataIndex - 1];
              if (prevValue) {
                const diff = percentageDifference(prevValue.c, value);
                return [
                  formatPrice(context.parsed.y),
                  `${diff > 0 ? "+" : ""}${
                    percentageDifference(prevValue.c, value).toFixed(2) + "%"
                  }`,
                ];
              }
              return [formatPrice(context.parsed.y)];
            },
            footer: () => "wow",
          },
          position: "nearest",
          external: function (context) {
            // Tooltip Element
            let tooltipEl = document.getElementById("chartjs-tooltip");

            // Create element on first render
            if (!tooltipEl) {
              tooltipEl = document.createElement("div");
              tooltipEl.id = "chartjs-tooltip";
              tooltipEl.innerHTML = "<div></div>";
              document.body.appendChild(tooltipEl);
            }

            // Hide if no tooltip
            const tooltipModel = context.tooltip;
            if (tooltipModel.opacity === 0) {
              tooltipEl.style.opacity = "0";
              return;
            }

            // Set caret Position
            tooltipEl.classList.remove("above", "below", "no-transform");
            if (tooltipModel.yAlign) {
              tooltipEl.classList.add(tooltipModel.yAlign);
            } else {
              tooltipEl.classList.add("no-transform");
            }

            function getBody(bodyItem: {
              before: string[];
              lines: string[];
              after: string[];
            }) {
              return bodyItem.lines;
            }

            // Set Text
            if (tooltipModel.body) {
              const bodyLines = tooltipModel.body.map(getBody);

              let innerHtml =
                "<div style='display: flex; flex-direction: column; align-items: center;'>";

              bodyLines[0].forEach((body, index) => {
                const style = [];

                if (index === 1) {
                  style.push("font-size: 12px");
                  if (body.includes("-")) {
                    style.push("color: rgb(248 113 113)");
                  } else {
                    style.push("color: rgb(74 222 128)");
                  }
                }

                const span =
                  '<div style="' + style.join(";") + '">' + body + "</div>";
                innerHtml += span;
              });
              innerHtml += "</div>";

              const divContainer = tooltipEl.querySelector("div");
              if (divContainer) {
                divContainer.innerHTML = innerHtml;
              }
            }

            const position = context.chart.canvas.getBoundingClientRect();

            // Display, position, and set styles for font
            tooltipEl.style.background = "rgba(170, 170, 170, 0.16)";
            tooltipEl.style.borderRadius = "16px";
            tooltipEl.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.1)";
            tooltipEl.style.backdropFilter = "blur(3.2px)";
            // tooltipEl.style.-webkit-backdrop-filter: blur(3.2px);
            tooltipEl.style.color = "white";
            tooltipEl.style.padding = "10px 20px";

            tooltipEl.style.transition = "all 0.2s";
            tooltipEl.style.opacity = "1";
            tooltipEl.style.position = "absolute";
            tooltipEl.style.left =
              position.left + window.scrollX + tooltipModel.caretX + "px";
            tooltipEl.style.top =
              position.top + window.scrollY + tooltipModel.caretY + "px";
            tooltipEl.style.transform = "translate(-50%, -125%)";
            tooltipEl.style.pointerEvents = "none";
          },
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
      responsive: true,
      maintainAspectRatio: true,
      showLine: true,
      line: {
        datasets: {
          indexAxis: "y",
          borderDash: [5, 5],
          showLine: true,
        },
      },
      scales: {
        x: {
          position: "bottom",
          ticks: {
            color: "rgb(156 163 175)",
            font: {
              size: 14,
            },
            maxRotation: 0,
            padding: 10,
          },
        },
        y: {
          position: "left",
          border: {
            display: false,
            dash: [5, 5],
            dashOffset: 10,
          },
          grid: {
            display: true,
            lineWidth: 1,
            tickLength: 0,
            color: "rgb(31 41 55)",
          },
          ticks: {
            autoSkip: true,
            maxTicksLimit: 3,
            color: "rgb(156 163 175)",
            font: {
              size: 14,
            },
            padding: 10,
            callback: (value) => {
              if (typeof value === "number") return formatPrice(value);
              return formatPrice(parseFloat(value));
            },
          },
        },
      },
    }),
    [series]
  );

  return (
    <>
      <Line data={data} options={options} className="w-full" />
      <div id="tooltip" />
    </>
  );
}
