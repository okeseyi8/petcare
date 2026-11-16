import type { Metadata, Viewport } from "next";
import { Figtree, Fredoka } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["500", "600"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "PetCare+ | Veterinary clinic for dogs and cats",
  description:
    "Wellness exams, vaccinations, dental care, grooming, surgery and boarding under one roof. Book an appointment with the PetCare+ veterinary team.",
  openGraph: {
    title: "PetCare+ | Exceptional care starts here",
    description: "Compassionate, modern veterinary care for every stage of your pet's life.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#245e62",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fredoka.variable} ${figtree.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
