import { ObjectValues } from "@/types";
import { useState } from "react";
import { ButtonGroup } from "./button-group";

export const TIMEFRAMES = {
  LIVE: "LIVE",
  DAY: "D",
  WEEK: "W",
  MONTH: "M",
  YEAR: "Y",
} as const;

export type Timeframe = ObjectValues<typeof TIMEFRAMES>;

type TimeframeButtonGroupProps = {
  onChange: (timeframe: Timeframe) => void;
};

export function TimeframeButtonGroup({ onChange }: TimeframeButtonGroupProps) {
  const [selected, setSelected] = useState<Timeframe>(TIMEFRAMES.DAY);

  const handleChange = (timeframe: Timeframe) => {
    setSelected(timeframe);
    if (onChange) {
      onChange(timeframe);
    }
  };

  return (
    <ButtonGroup
      buttons={Object.keys(TIMEFRAMES).map((key) => {
        const value = TIMEFRAMES[key as keyof typeof TIMEFRAMES];
        return {
          children: value,
          onClick: () => handleChange(value),
          active: selected === value,
          className: key === TIMEFRAMES.LIVE ? "min-w-fit" : "",
        };
      })}
    />
  );
}
