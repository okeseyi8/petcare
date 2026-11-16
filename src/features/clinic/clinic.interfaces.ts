import type { LucideIcon } from "lucide-react";

export interface IPhoto {
  src: string;
  alt: string;
}

export interface IService {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  photo: IPhoto;
}

export interface IStat {
  value: string;
  label: string;
  detail: string;
}

export interface IVet {
  id: string;
  name: string;
  role: string;
  focus: string;
  photo: IPhoto;
}

export interface ITestimonial {
  id: string;
  quote: string;
  author: string;
  pet: string;
  photos: [IPhoto & { tag: string }, IPhoto & { tag: string }];
}

export interface INavLink {
  label: string;
  href: `#${string}`;
}
