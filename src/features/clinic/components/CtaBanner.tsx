import { Heart } from "lucide-react";
import Image from "next/image";
import { ButtonArrow, buttonStyles } from "@/components/ui/Button";
import { PHOTOS } from "../clinic.constants";

export function CtaBanner() {
  return (
    <section aria-labelledby="cta-title" className="shell pt-32 pb-28 sm:pt-40 sm:pb-32">
      <div className="relative grid rounded-[2rem] bg-mint md:grid-cols-[1.25fr_1fr]">
        <div className="relative z-10 px-6 pt-10 pb-4 sm:px-10 sm:pt-14 md:pb-14 lg:px-14 lg:py-16">
          <h2 id="cta-title" className="max-w-[16ch] text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.02em]">
            Ready to give your pet the <span className="text-teal-700">care</span> they deserve?
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-muted">
            Same-week appointments, friendly vets and clear advice. Book a visit in under two minutes.
          </p>
          <a href="#contact" className={buttonStyles({ variant: "dark", className: "mt-8" })}>
            Book appointment
            <ButtonArrow />
          </a>
        </div>

        {/* Cut-out dog: head rises above the panel, paws hang over its lower edge. */}
        <div className="relative h-80 sm:h-96 md:h-auto">
          <Image
            src={PHOTOS.ctaDog.src}
            alt={PHOTOS.ctaDog.alt}
            width={760}
            height={1323}
            sizes="(min-width: 48rem) 20rem, 60vw"
            className="absolute -bottom-6 left-1/2 h-[118%] w-auto max-w-none -translate-x-1/2 object-contain md:-bottom-8 md:h-[132%]"
          />
          <span className="absolute top-6 left-4 z-10 -rotate-6 rounded-full bg-teal-900 px-4 py-2 font-display text-sm font-medium text-white sm:left-10 md:top-[18%] md:-left-6">
            Friendly vets, 7 days a week
          </span>
          <Heart
            aria-hidden
            strokeWidth={1.75}
            className="absolute right-6 bottom-16 size-9 rotate-12 text-teal-700 sm:right-12 md:right-4 md:bottom-24"
          />
        </div>
      </div>
    </section>
  );
}
