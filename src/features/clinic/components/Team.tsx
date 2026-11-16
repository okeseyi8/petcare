"use client";

import { PawPrint } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ButtonArrow, buttonStyles } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { VETS } from "../clinic.constants";

export function Team() {
  const [activeId, setActiveId] = useState(VETS[0].id);

  return (
    <section id="team" aria-labelledby="team-title" className="shell py-24 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.7fr] lg:gap-16">
        <div className="flex flex-col items-start">
          <h2 id="team-title" className="text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.02em]">
            Exceptional care, expert people
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-muted">
            Our vets bring years of experience in general practice, surgery and dentistry. You see the same faces at
            every visit, so your pet always knows who is caring for them.
          </p>
          <a href="#contact" className={buttonStyles({ variant: "dark", className: "mt-8" })}>
            Book with our vets
            <ButtonArrow />
          </a>
          <PawPrint className="mt-auto hidden size-16 text-mint-strong lg:block" strokeWidth={1.25} aria-hidden />
        </div>

        <ul
          aria-label="Our vets"
          className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 md:mx-0 md:h-[30rem] md:overflow-visible md:px-0 md:pb-0"
        >
          {VETS.map((vet) => {
            const isActive = vet.id === activeId;
            return (
              <li
                key={vet.id}
                data-active={isActive}
                className="w-[78%] shrink-0 snap-start transition-[flex-grow] duration-500 ease-(--ease-in-out) motion-reduce:transition-none sm:w-[46%] md:w-auto md:shrink md:grow md:basis-0 md:data-[active=true]:grow-[3.2]"
              >
                <button
                  type="button"
                  aria-pressed={isActive}
                  aria-label={`${vet.name}, ${vet.role}`}
                  onClick={() => setActiveId(vet.id)}
                  onMouseEnter={() => setActiveId(vet.id)}
                  onFocus={() => setActiveId(vet.id)}
                  className="group relative block aspect-[3/4] w-full overflow-hidden rounded-[var(--radius-frame)] text-left md:aspect-auto md:h-full"
                >
                  <Image src={vet.photo.src} alt={vet.photo.alt} fill sizes="(min-width: 48rem) 34rem, 80vw" className="object-cover" />

                  {/* Collapsed strip: name runs vertically (desktop only). */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-0 hidden items-end justify-center bg-teal-950/55 pb-6 transition-opacity duration-300 md:flex",
                      isActive ? "opacity-0" : "opacity-100",
                    )}
                  >
                    <span className="font-display text-xl font-medium whitespace-nowrap text-white [writing-mode:vertical-rl] rotate-180">
                      {vet.name}
                    </span>
                  </span>

                  {/* Expanded caption. Always shown on mobile cards. */}
                  <span
                    className={cn(
                      "absolute inset-x-3 bottom-3 rounded-2xl bg-white px-4 py-3 transition-[opacity,transform] duration-300 ease-(--ease-out)",
                      isActive ? "md:translate-y-0 md:opacity-100 md:delay-200" : "md:translate-y-2 md:opacity-0",
                    )}
                  >
                    <span className="block font-display text-lg font-semibold text-ink md:whitespace-nowrap">{vet.name}</span>
                    <span className="block text-sm text-muted md:whitespace-nowrap">
                      {vet.role} · {vet.focus}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
