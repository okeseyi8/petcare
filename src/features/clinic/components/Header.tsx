"use client";

import { Menu, Phone, X } from "lucide-react";
import { useRef } from "react";
import { ButtonArrow, buttonStyles } from "@/components/ui/Button";
import { CONTACT_INFO, NAV_LINKS } from "../clinic.constants";
import { Wordmark } from "./Wordmark";

export function Header() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Native <dialog> gives focus trapping, Escape-to-close, an inert page behind
  // it and focus return to the trigger.
  const openMenu = () => dialogRef.current?.showModal();
  const closeMenu = () => dialogRef.current?.close();

  return (
    <header className="on-dark absolute inset-x-0 top-0 z-20 text-white">
      <div className="shell flex h-20 items-center justify-between gap-6">
        <a href="#top" aria-label="PetCare+ home" className="rounded-md">
          <Wordmark />
        </a>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-3.5 py-2 text-[0.9375rem] font-medium text-white/80 transition-colors duration-150 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href="#contact" className={buttonStyles({ variant: "light", className: "hidden sm:inline-flex" })}>
            Book a visit
            <ButtonArrow />
          </a>
          <button
            type="button"
            onClick={openMenu}
            aria-label="Open menu"
            aria-haspopup="dialog"
            className="grid size-12 place-items-center rounded-full bg-white text-ink transition-transform duration-150 ease-(--ease-out) active:scale-[0.95] md:hidden"
          >
            <Menu className="size-5" aria-hidden />
          </button>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Menu"
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMenu();
        }}
        className="on-dark m-0 h-dvh max-h-none w-full max-w-none bg-teal-950 text-white opacity-100 transition-[opacity,transform,display,overlay] transition-discrete duration-250 ease-(--ease-out) backdrop:bg-ink/40 starting:open:-translate-y-3 starting:open:opacity-0 not-open:opacity-0 md:hidden"
      >
        <div className="shell flex h-full flex-col">
          <div className="flex h-20 items-center justify-between">
            <Wordmark />
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              className="grid size-12 place-items-center rounded-full bg-white/10 transition-transform duration-150 ease-(--ease-out) active:scale-[0.95]"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>

          <nav aria-label="Mobile" className="mt-6">
            <ul className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <li key={link.href} className="border-b border-white/10">
                  <a href={link.href} onClick={closeMenu} className="block py-4 font-display text-3xl font-medium">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto flex flex-col gap-4 pb-8">
            <a href="#contact" onClick={closeMenu} className={buttonStyles({ variant: "light", className: "justify-between" })}>
              Book a visit
              <ButtonArrow />
            </a>
            <a href={CONTACT_INFO.phone.href} className="inline-flex items-center gap-2 text-on-dark-muted">
              <Phone className="size-4" aria-hidden />
              {CONTACT_INFO.phone.display}
            </a>
          </div>
        </div>
      </dialog>
    </header>
  );
}
