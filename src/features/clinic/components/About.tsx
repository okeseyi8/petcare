import Image from "next/image";
import { PHOTOS, TRUST_AVATARS } from "../clinic.constants";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="shell py-20 sm:py-28">
      <div className="grid gap-6 lg:grid-cols-[13rem_1fr] lg:gap-12">
        <p className="hidden pt-2 text-sm font-medium text-muted lg:block">In safe hands, happy pets</p>
        <h2
          id="about-title"
          className="reveal text-[clamp(1.625rem,3vw,2.5rem)] leading-[1.2] font-medium tracking-[-0.01em]"
        >
          At PetCare+, we believe exceptional care starts with trust.{" "}
          <span className="text-muted">
            From preventive wellness and routine check-ups to advanced treatment, our experienced team is here to help
            every pet live a longer, healthier and happier life.
          </span>
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-16 lg:grid-cols-[13rem_1fr_1.35fr_1fr] lg:gap-6">
        <div className="relative col-span-1 aspect-[4/5] overflow-hidden rounded-[var(--radius-frame)] lg:col-start-1 lg:self-start">
          <Image src={PHOTOS.aboutCuddle.src} alt={PHOTOS.aboutCuddle.alt} fill sizes="(min-width: 64rem) 13rem, 50vw" className="object-cover" />
        </div>
        <div className="relative col-span-1 aspect-[4/5] overflow-hidden rounded-[var(--radius-frame)] lg:col-span-2 lg:aspect-[16/11]">
          <Image src={PHOTOS.aboutHome.src} alt={PHOTOS.aboutHome.alt} fill sizes="(min-width: 64rem) 40rem, 50vw" className="object-cover" />
        </div>

        <div className="col-span-2 flex flex-col justify-end gap-4 border-t border-line pt-6 lg:col-span-1 lg:border-t-0 lg:pt-0">
          <p className="font-display text-[clamp(3.5rem,6vw,5rem)] leading-none font-semibold text-teal-900">+32%</p>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {TRUST_AVATARS.map((avatar) => (
                <Image key={avatar.src} src={avatar.src} alt="" width={32} height={32} className="size-8 rounded-full object-cover ring-2 ring-white" />
              ))}
            </div>
            <span className="text-sm font-semibold">more pets on care plans this year</span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            Families are choosing yearly wellness plans that bundle check-ups, vaccines and dental care, so small
            problems get caught before they become big ones.
          </p>
        </div>
      </div>
    </section>
  );
}
