import { cn } from "@/lib/utils";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-display text-2xl font-semibold tracking-tight", className)}>
      PetCare<span className="text-teal-200">+</span>
    </span>
  );
}
