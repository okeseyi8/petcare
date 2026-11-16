"use client";

import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { TESTIMONIALS } from "../clinic.constants";

const ROUND_BUTTON =
  "grid size-12 place-items-center rounded-full border border-line text-ink transition-[transform,background-color,border-color] duration-150 ease-(--ease-out) hover:border-teal-900 hover:bg-teal-900 hover:text-white active:scale-[0.95]";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const count = TESTIMONIALS.length;
  const go = (next: number) => setIndex((next + count) % count);

  return (
    <section id="reviews" aria-labelledby="reviews-title" aria-roledescription="carousel" className="shell pb-24 sm:pb-32">
      <h2
        id="reviews-title"
        className="mx-auto max-w-2xl text-center text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.02em]"
      >
        Trusted by thousands of pet families
      </h2>

      <div className="mt-12 grid lg:mt-16">
        {TESTIMONIALS.map((item, i) => {
          const isActive = i === index;
          return (
            <article
              key={item.id}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              inert={!isActive}
              className={cn(
                "[grid-area:1/1] grid gap-3 transition-[opacity,filter] duration-300 ease-(--ease-out) sm:gap-4 lg:grid-cols-[1.45fr_1fr]",
                isActive ? "opacity-100 blur-0" : "pointer-events-none opacity-0 blur-[2px]",
              )}
            >
              <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
                <span
                  aria-hidden
                  className="absolute top-1/2 left-1/2 z-10 grid size-11 -translate-1/2 place-items-center rounded-full bg-teal-900 text-white ring-[6px] ring-white sm:size-14"
                >
                  <ArrowRight className="size-5" strokeWidth={2.25} />
                </span>
                {item.photos.map((photo) => (
                  <figure key={photo.src} className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-frame)]">
                    <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 64rem) 22rem, 50vw" className="object-cover" />
                    <figcaption className="absolute bottom-3 left-3 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ink">
                      {photo.tag}
                    </figcaption>
                  </figure>
                ))}
              </div>

              <figure className="flex flex-col rounded-[var(--radius-frame)] bg-cloud p-6 sm:p-8">
                <blockquote className="font-display text-[clamp(1.25rem,2vw,1.625rem)] leading-snug font-medium">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-auto flex items-end justify-between gap-4 pt-8">
                  <span>
                    <span className="block font-semibold">{item.author}</span>
                    <span className="text-sm text-muted">{item.pet}</span>
                  </span>
                  <Quote className="size-12 shrink-0 fill-teal-900 text-teal-900" aria-hidden />
                </figcaption>
              </figure>
            </article>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button type="button" onClick={() => go(index - 1)} aria-label="Previous review" className={ROUND_BUTTON}>
          <ArrowLeft className="size-5" aria-hidden />
        </button>
        <div className="flex gap-1">
          {TESTIMONIALS.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show review ${i + 1}`}
              aria-current={i === index}
              className="grid size-6 place-items-center"
            >
              <span
                className={cn(
                  "h-2 rounded-full transition-[width,background-color] duration-200 ease-(--ease-out)",
                  i === index ? "w-6 bg-teal-900" : "w-2 bg-line",
                )}
              />
            </button>
          ))}
        </div>
        <button type="button" onClick={() => go(index + 1)} aria-label="Next review" className={ROUND_BUTTON}>
          <ArrowRight className="size-5" aria-hidden />
        </button>
      </div>
    </section>
  );
}
