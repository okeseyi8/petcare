import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const CONTROL =
  "w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-[0.9375rem] text-white " +
  "placeholder:text-on-dark-muted transition-[border-color,background-color] duration-150 " +
  "hover:border-white/30 focus:border-teal-200 focus:bg-white/[0.09] focus:outline-none " +
  "aria-invalid:border-[#f4a59c]";

interface IFieldProps {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}

/** Label + control + error message. Controls are styled for dark surfaces. */
export function Field({ id, label, error, className, children }: IFieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-sm font-medium text-white">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-[#f4a59c]">
          {error}
        </p>
      )}
    </div>
  );
}

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(CONTROL, "[color-scheme:dark]", className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cn(CONTROL, "min-h-32 resize-y", className)} {...props} />;
}

export function Select({ className, ...props }: ComponentProps<"select">) {
  return <select className={cn(CONTROL, "appearance-none bg-no-repeat [color-scheme:dark]", className)} {...props} />;
}
