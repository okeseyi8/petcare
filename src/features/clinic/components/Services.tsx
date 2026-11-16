import Image from "next/image";
import { SERVICES } from "../clinic.constants";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="shell pb-24 sm:pb-32">
      <div className="mx-auto max-w-2xl text-center">
        <h2 id="services-title" className="text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.02em]">
          Everything your pet needs under one roof
        </h2>
        <p className="mt-4 text-muted">
          One clinic, one team, one record for your pet, from their first vaccines to senior care.
        </p>
      </div>

      <ul className="-mx-4 mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:mt-12 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:mt-16 lg:grid-cols-3">
        {SERVICES.map(({ id, title, description, icon: Icon, photo }) => (
          <li key={id} className="reveal flex w-[82%] shrink-0 snap-start flex-col overflow-hidden rounded-[var(--radius-frame)] bg-cloud sm:w-auto">
            <div className="scallop-bottom relative aspect-[16/10] [--scallop:1.75rem]">
              <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 64rem) 24rem, (min-width: 40rem) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="flex flex-1 flex-col gap-2 px-6 pt-3 pb-7">
              <span className="mb-2 grid size-11 place-items-center rounded-full bg-teal-900 text-white">
                <Icon className="size-5" strokeWidth={1.75} aria-hidden />
              </span>
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="text-[0.9375rem] leading-relaxed text-muted">{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
