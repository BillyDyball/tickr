import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ButtonGroupProps = {
  buttons: (ButtonProps & { active?: boolean })[];
};

export function ButtonGroup({ buttons }: ButtonGroupProps) {
  return (
    <div className="inline-flex rounded-2xl bg-slate-900" role="group">
      {buttons.map(({ className, active, ...buttonProps }, index) => (
        <Button
          key={index}
          {...buttonProps}
          variant={"ghost"}
          className={cn(
            "bg-transparent hover:bg-transparent rounded-full text-gray-400 border border-transparent hover:border-sky-400 hover:text-white h-9 w-9",
            className,
            active ? "border-sky-400 text-white" : ""
          )}
        />
      ))}
    </div>
  );
}
