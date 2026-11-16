import { BedDouble, Scissors, ShieldCheck, Smile, Stethoscope, Syringe } from "lucide-react";
import type { INavLink, IPhoto, IService, IStat, ITestimonial, IVet } from "./clinic.interfaces";

/*
 * SAMPLE CONTENT — replace before launch.
 * Stats, vet names/roles, testimonials and contact details below are realistic
 * placeholders, not verified facts about a real clinic.
 *
 * Photos: Unsplash (https://unsplash.com/license), referenced by photo ID.
 */

const unsplash = (id: string, params = "w=1600") =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&${params}`;

export const PHOTOS = {
  heroGrass: { src: unsplash("1633722715463-d30f4f325e24"), alt: "Golden retriever sitting on a sunny lawn, smiling at the camera" },
  heroExam: { src: unsplash("1700665537604-412e89a285c3"), alt: "Two vets in navy scrubs examining a calm brown dog on the exam table" },
  heroHug: { src: unsplash("1522276498395-f4f68f7f8454"), alt: "Owner hugging his golden retriever outdoors" },
  aboutCuddle: { src: unsplash("1601758003453-6c950f17727d"), alt: "Man kissing the black and tan dog he carries in his arms" },
  aboutHome: { src: unsplash("1609098245951-f1872318dd21"), alt: "Man resting his head on his hand next to a curly-haired dog" },
  whyTeam: { src: unsplash("1700665537650-1bf37979aae0"), alt: "Two smiling PetCare+ team members in navy scrubs holding a puppy" },
  contact: { src: unsplash("1594283255808-ee728c775ba6"), alt: "Smiling man holding his small fluffy dog close" },
  // Cut-out of Unsplash photo-1693615775129-f2004d6e3e0b (Vision subject lift).
  ctaDog: { src: "/images/cta-dog.webp", alt: "Happy golden retriever sitting upright" },
} satisfies Record<string, IPhoto>;

export const NAV_LINKS: INavLink[] = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "Our vets", href: "#team" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export const SERVICES: IService[] = [
  {
    id: "wellness",
    title: "Wellness Exams",
    description: "Nose-to-tail check-ups that catch problems early and keep your pet's health on track.",
    icon: Stethoscope,
    photo: { src: unsplash("1654895716780-b4664497420d"), alt: "Chihuahua standing alert on the exam table during a check-up" },
  },
  {
    id: "vaccinations",
    title: "Vaccinations",
    description: "Core and lifestyle vaccines on a schedule built around your pet's age and routine.",
    icon: Syringe,
    photo: { src: unsplash("1770836037275-38b44e4b101f"), alt: "Vet giving a small dog a vaccination in its leg" },
  },
  {
    id: "grooming",
    title: "Grooming",
    description: "Bathing, trimming and nail care by groomers who know how to keep pets calm.",
    icon: Scissors,
    photo: { src: unsplash("1719464454959-9cf304ef4774"), alt: "Groomer trimming the fur of a small white poodle" },
  },
  {
    id: "dental",
    title: "Dental Care",
    description: "Cleaning, polishing and oral exams for fresh breath and healthy teeth for life.",
    icon: Smile,
    photo: { src: unsplash("1770836037949-c5e8db65aa86"), alt: "Vet checking a dachshund's teeth" },
  },
  {
    id: "surgery",
    title: "Surgery",
    description: "Soft-tissue and orthopaedic procedures with modern monitoring and pain management.",
    icon: ShieldCheck,
    photo: { src: unsplash("1770836037816-4445dbd449fd"), alt: "Vet wearing magnifying loupes during a close examination" },
  },
  {
    id: "boarding",
    title: "Pet Boarding",
    description: "Cosy, supervised stays with vet care on hand while you're away.",
    icon: BedDouble,
    photo: { src: unsplash("1743763959056-41bbb557272d"), alt: "Two brown dogs curled up together asleep in a bed" },
  },
];

export const STATS: IStat[] = [
  { value: "15K+", label: "Happy pets treated", detail: "Dogs, cats and small pets since we opened" },
  { value: "20+", label: "Veterinary specialists", detail: "Surgery, dentistry, dermatology and more" },
  { value: "10+", label: "Years of experience", detail: "Serving local families every day of the week" },
  { value: "4.9", label: "Client rating", detail: "Average across 2,300+ verified reviews" },
];

const face = "w=900&h=1200&crop=faces";

export const VETS: IVet[] = [
  {
    id: "elena",
    name: "Dr. Elena Ruiz",
    role: "Lead Veterinarian",
    focus: "Preventive medicine and senior pet care",
    photo: { src: unsplash("1594824476967-48c8b964273f", face), alt: "Dr. Elena Ruiz in teal scrubs, arms crossed, smiling" },
  },
  {
    id: "marcus",
    name: "Dr. Marcus Reed",
    role: "Veterinary Surgeon",
    focus: "Soft-tissue and orthopaedic surgery",
    photo: { src: unsplash("1622253692010-333f2da6031d", face), alt: "Dr. Marcus Reed in blue scrubs with a stethoscope, smiling" },
  },
  {
    id: "sofia",
    name: "Dr. Sofia Marin",
    role: "Dental & Dermatology",
    focus: "Oral health, allergies and skin conditions",
    photo: { src: unsplash("1673865641073-4479f93a7776", face), alt: "Dr. Sofia Marin in a white lab coat with a stethoscope" },
  },
];

export const TESTIMONIALS: ITestimonial[] = [
  {
    id: "bella",
    quote:
      "Bella came to PetCare+ as a nervous eight-week-old. Two years on she drags us through the door. The team explains everything and never rushes us.",
    author: "Hannah Cole",
    pet: "Bella, golden retriever",
    photos: [
      { src: unsplash("1591160690555-5debfba289f0"), alt: "Golden retriever puppy Bella at eight weeks", tag: "First visit" },
      { src: unsplash("1626736637845-53045bb9695b"), alt: "Bella grown up, lying on the pavement with her tongue out", tag: "Today" },
    ],
  },
  {
    id: "milo",
    quote:
      "Milo needed knee surgery and I was terrified. Dr. Reed walked me through every step, and he was chasing his ball again within six weeks.",
    author: "James Okafor",
    pet: "Milo, mixed breed",
    photos: [
      { src: unsplash("1644675272883-0c4d582528d8"), alt: "Vet in a face mask comforting a young dog at the clinic", tag: "Pre-op check" },
      { src: unsplash("1730677769210-7b5a39d0635e"), alt: "Brown and white dog panting happily on a sunny lawn", tag: "Six weeks on" },
    ],
  },
  {
    id: "lola",
    quote:
      "Lola had a painful tooth we never noticed. The dental team spotted it at her check-up, and she's been eating like a dog twice her size ever since.",
    author: "Priya Shah",
    pet: "Lola, dachshund",
    photos: [
      { src: unsplash("1770836037793-95bdbf190f71"), alt: "Vet examining Lola, a black and tan dachshund", tag: "Check-up" },
      { src: unsplash("1595314544137-1b106b06e2c1"), alt: "Woman hugging her small tan dog in front of green leaves", tag: "Back home" },
    ],
  },
];

export const CONTACT_INFO = {
  phone: { display: "(555) 014-2280", href: "tel:+15550142280" },
  email: { display: "hello@petcareplus.example", href: "mailto:hello@petcareplus.example" },
  address: "214 Willow Lane, Riverside, CA 92501",
  hours: "Mon–Sat 8:00–19:00 · 24/7 emergency line",
} as const;

export const TRUST_AVATARS: IPhoto[] = VETS.map((vet) => ({
  src: vet.photo.src.replace(face, "w=96&h=96&crop=faces"),
  alt: "",
}));
