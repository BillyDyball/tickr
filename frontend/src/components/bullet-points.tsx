interface BulletPointsProps {
  points: string[];
}

export function BulletPoints({ points }: BulletPointsProps) {
  return (
    <ul className="space-y-2">
      {points.map((point, index) => (
        <li key={index} className="flex gap-2 items-start">
          <div className="rounded-full bg-white border-4 border-slate-700 aspect-square h-4 mt-0.5" />
          <span className="text-sm">{point}</span>
        </li>
      ))}
    </ul>
  );
}
