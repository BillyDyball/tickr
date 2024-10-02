import { Checkbox as ShadcnCheckbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function Checkbox({
  id,
  label,
  checked,
  onChange,
  disabled = false,
}: CheckboxProps) {
  return (
    <div className="flex items-center space-x-2">
      <ShadcnCheckbox
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
      />
      <Label
        htmlFor={id}
        className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
          disabled ? "'cursor-not-allowed opacity-70'" : "''"
        }`}
      >
        {label}
      </Label>
    </div>
  );
}
