import Image from "next/image";
import { PHOTOS, STATS } from "../clinic.constants";

export function WhyUs() {
  return (
    <section aria-labelledby="why-title" className="on-dark scallop-y bg-ink text-white [--scallop:2.75rem]">
      <div className="shell grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div>
          <h2 id="why-title" className="text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.02em]">
            Why pet owners choose us
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-on-dark-muted">
            Experienced vets, modern equipment and a team that treats your pet like family, with clear advice and no
            surprises on the bill.
          </p>

          <dl className="mt-10 border-t border-white/10">
            {STATS.map((stat) => (
              <div key={stat.label} className="grid grid-cols-[5.5rem_1fr] items-baseline gap-x-6 border-b border-white/10 py-5 sm:grid-cols-[7rem_1fr]">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-[2.25rem] leading-none font-semibold tabular-nums sm:text-[2.75rem]">{stat.value}</dd>
                <dd>
                  <span className="block font-semibold">{stat.label}</span>
                  <span className="text-sm text-on-dark-muted">{stat.detail}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="reveal relative aspect-[4/5] overflow-hidden rounded-[var(--radius-frame)] lg:aspect-[5/6]">
          <Image src={PHOTOS.whyTeam.src} alt={PHOTOS.whyTeam.alt} fill sizes="(min-width: 64rem) 36rem, 100vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
