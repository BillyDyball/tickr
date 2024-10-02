import { LucideIcon } from "lucide-react";

interface CircleIconProps {
  icon: LucideIcon;
  color: string;
  size?: number;
}

export function CircleIcon({ icon: Icon, color, size = 24 }: CircleIconProps) {
  // Convert the color to RGB format for the background
  const getRGBA = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <div
      className="inline-flex items-center justify-center rounded-full p-2 h-fit w-fit"
      style={{ backgroundColor: getRGBA(color, 0.2) }}
    >
      <Icon color={color} size={size} aria-hidden="true" />
    </div>
  );
}
