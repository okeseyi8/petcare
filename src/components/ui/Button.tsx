import { ArrowUpRight } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const VARIANT = {
  light: "bg-white text-ink [--cap-bg:var(--color-teal-900)] [--cap-fg:white]",
  dark: "bg-teal-900 text-white [--cap-bg:white] [--cap-fg:var(--color-teal-900)]",
  ink: "bg-ink text-white [--cap-bg:var(--color-mint)] [--cap-fg:var(--color-ink)]",
} as const;

type TButtonVariant = keyof typeof VARIANT;

interface IButtonStyleOptions {
  variant?: TButtonVariant;
  withArrow?: boolean;
  className?: string;
}

/** Pill button styles, shared by <Button> and anchor CTAs. */
export function buttonStyles({ variant = "dark", withArrow = true, className }: IButtonStyleOptions = {}) {
  return cn(
    "group/btn inline-flex min-h-12 items-center gap-3 rounded-full py-1.5 text-[0.9375rem] font-semibold",
    "transition-[transform,background-color,opacity] duration-150 ease-(--ease-out) active:scale-[0.97]",
    "disabled:pointer-events-none disabled:opacity-60",
    withArrow ? "pr-1.5 pl-5" : "px-5",
    VARIANT[variant],
    className,
  );
}

/** The circular arrow cap at the end of a pill button. */
export function ButtonArrow() {
  return (
    <span
      aria-hidden
      className="grid size-9 place-items-center rounded-full bg-(--cap-bg) text-(--cap-fg) transition-transform duration-200 ease-(--ease-out) [@media(hover:hover)]:group-hover/btn:rotate-45"
    >
      <ArrowUpRight className="size-4" strokeWidth={2.25} />
    </span>
  );
}

interface IButtonProps extends ComponentProps<"button"> {
  variant?: TButtonVariant;
  withArrow?: boolean;
}

export function Button({ variant, withArrow = true, className, children, ...props }: IButtonProps) {
  return (
    <button className={buttonStyles({ variant, withArrow, className })} {...props}>
      {children}
      {withArrow && <ButtonArrow />}
    </button>
  );
}
