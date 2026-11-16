import { ArrowUp, PawPrint } from "lucide-react";
import { CONTACT_INFO, NAV_LINKS } from "../clinic.constants";
import { Wordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer className="on-dark relative overflow-hidden bg-ink text-white">
      <PawPrint aria-hidden strokeWidth={1} className="pointer-events-none absolute top-10 right-[6%] size-40 -rotate-12 text-white/[0.04]" />
      <div className="shell grid gap-10 pt-16 pb-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Wordmark />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-on-dark-muted">
            Compassionate, modern veterinary care for dogs, cats and small pets, from first vaccines to golden years.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-col gap-2.5 text-sm">
            {NAV_LINKS.slice(1).map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-white/80 transition-colors duration-150 hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <address className="flex flex-col gap-2.5 text-sm not-italic text-white/80">
          <a href={CONTACT_INFO.phone.href} className="hover:text-white">
            {CONTACT_INFO.phone.display}
          </a>
          <a href={CONTACT_INFO.email.href} className="hover:text-white">
            {CONTACT_INFO.email.display}
          </a>
          <span>{CONTACT_INFO.address}</span>
        </address>
      </div>

      {/* Decorative wordmark, cropped by the bar below as in the brand layout. */}
      <div aria-hidden className="shell select-none">
        <p className="font-display text-[clamp(5rem,23vw,21rem)] leading-[0.8] font-semibold tracking-[-0.03em] text-white">
          PetCare<span className="text-teal-200">+</span>
        </p>
      </div>

      {/* Scalloped bar rises over the wordmark so it sinks behind it. */}
      <div className="scallop-top relative z-10 -mt-[clamp(1.75rem,6.5vw,6rem)] bg-teal-900 [--scallop:2.5rem]">
        <div className="shell flex flex-col gap-3 py-5 text-sm text-[#cfe3df] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 PetCare+ Veterinary Clinic. All rights reserved.</p>
          <a href="#top" className="inline-flex items-center gap-1.5 hover:text-white">
            Back to top
            <ArrowUp className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
