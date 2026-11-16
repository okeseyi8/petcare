import Image from "next/image";
import { ButtonArrow, buttonStyles } from "@/components/ui/Button";
import { PHOTOS, TRUST_AVATARS } from "../clinic.constants";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="on-dark scallop-bottom bg-teal-900 text-white [--scallop:2.75rem]">
      <div className="shell flex flex-col items-center pt-32 text-center sm:pt-36">
        <h1
          id="hero-title"
          className="text-[clamp(2.75rem,6.5vw,5rem)] leading-[1] font-semibold tracking-[-0.02em]"
        >
          Exceptional care <br className="hidden sm:block" />
          starts here.
        </h1>
        <p className="mt-6 max-w-[34rem] text-[1.0625rem] leading-relaxed text-[#cfe3df]">
          From routine wellness to advanced treatment, our vets give every pet the same gentle, expert care we would
          want for our own.
        </p>

        <div className="mt-8 flex flex-col items-center gap-5 sm:flex-row sm:gap-6">
          <a href="#contact" className={buttonStyles({ variant: "light" })}>
            Book an appointment
            <ButtonArrow />
          </a>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2.5">
              {TRUST_AVATARS.map((avatar) => (
                <Image
                  key={avatar.src}
                  src={avatar.src}
                  alt=""
                  width={36}
                  height={36}
                  className="size-9 rounded-full object-cover ring-2 ring-teal-900"
                />
              ))}
            </div>
            <p className="text-left text-sm leading-tight text-[#cfe3df]">
              <span className="block font-semibold text-white">Trusted by 15K+</span>
              pet families
            </p>
          </div>
        </div>
      </div>

      <div className="shell mt-12 -mb-[calc(var(--scallop)/2)] grid grid-cols-[1fr_1.2fr_1fr] items-end gap-2 sm:mt-16 sm:gap-4">
        <div className="relative aspect-[4/5] overflow-hidden rounded-t-[var(--radius-frame)]">
          <Image src={PHOTOS.heroGrass.src} alt={PHOTOS.heroGrass.alt} fill sizes="(min-width: 78rem) 24rem, 30vw" className="object-cover" />
        </div>
        <div className="relative aspect-[4/4.6] overflow-hidden rounded-t-[var(--radius-frame)]">
          <Image
            src={PHOTOS.heroExam.src}
            alt={PHOTOS.heroExam.alt}
            fill
            preload
            sizes="(min-width: 78rem) 29rem, 37vw"
            className="object-cover"
          />
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-t-[var(--radius-frame)]">
          <Image src={PHOTOS.heroHug.src} alt={PHOTOS.heroHug.alt} fill sizes="(min-width: 78rem) 24rem, 30vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
