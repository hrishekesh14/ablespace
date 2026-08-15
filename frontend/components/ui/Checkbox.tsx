import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  id?: string;
}

export function Checkbox({ checked, onChange, label, id }: CheckboxProps) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center gap-2 select-none">
      <span
        role="checkbox"
        aria-checked={checked}
        tabIndex={0}
        id={id}
        onClick={() => onChange(!checked)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onChange(!checked);
          }
        }}
        className={cn(
          "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          checked ? "border-accent bg-accent" : "border-border bg-surface"
        )}
      >
        {checked && <Check className="h-3 w-3 text-accent-fg" strokeWidth={3} />}
      </span>
      {label && <span className="text-sm text-ink">{label}</span>}
    </label>
  );
}
