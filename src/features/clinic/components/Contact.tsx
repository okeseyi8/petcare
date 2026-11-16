import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { AppointmentForm } from "@/features/appointments/components/AppointmentForm";
import { CONTACT_INFO, PHOTOS } from "../clinic.constants";

const ROWS = [
  { icon: Phone, label: "Call us", value: CONTACT_INFO.phone.display, href: CONTACT_INFO.phone.href },
  { icon: Mail, label: "Email", value: CONTACT_INFO.email.display, href: CONTACT_INFO.email.href },
  { icon: MapPin, label: "Visit", value: CONTACT_INFO.address },
  { icon: Clock, label: "Opening hours", value: CONTACT_INFO.hours },
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="on-dark scallop-y bg-ink text-white [--scallop:2.75rem]">
      <div className="shell grid gap-6 py-20 sm:py-24 lg:grid-cols-[1fr_1.1fr] lg:gap-8">
        <div className="relative isolate flex min-h-[34rem] flex-col justify-between overflow-hidden rounded-[var(--radius-frame)] p-6 sm:p-8">
          <Image src={PHOTOS.contact.src} alt={PHOTOS.contact.alt} fill sizes="(min-width: 64rem) 36rem, 100vw" className="-z-10 object-cover" />
          {/* Scrim keeps the copy legible over the photo. */}
          <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(7_20_19/0.82)_0%,rgb(7_20_19/0.15)_45%,rgb(7_20_19/0.9)_100%)]" />

          <h2 id="contact-title" className="max-w-[14ch] text-[clamp(2rem,4.5vw,3rem)] leading-[1.05] font-semibold tracking-[-0.02em]">
            Get in touch with pet care experts
          </h2>

          <ul className="mt-10 flex flex-col gap-4">
            {ROWS.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-teal-900">
                  <Icon className="size-[1.125rem]" aria-hidden />
                </span>
                <span className="text-sm leading-snug">
                  <span className="block text-white/70">{label}</span>
                  {href ? (
                    <a href={href} className="font-semibold underline-offset-4 hover:underline">
                      {value}
                    </a>
                  ) : (
                    <span className="font-semibold">{value}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[var(--radius-frame)] bg-ink-soft p-6 sm:p-8 lg:p-10">
          <h3 className="text-2xl font-semibold">Request an appointment</h3>
          <p className="mt-2 mb-8 text-sm text-on-dark-muted">
            Tell us a little about your pet and when suits you. We&apos;ll confirm a time within one working day.
          </p>
          <AppointmentForm />
        </div>
      </div>
    </section>
  );
}
