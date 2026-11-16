import { About } from "./About";
import { Contact } from "./Contact";
import { CtaBanner } from "./CtaBanner";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Services } from "./Services";
import { Team } from "./Team";
import { Testimonials } from "./Testimonials";
import { WhyUs } from "./WhyUs";

export function HomeView() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-white px-4 py-2 font-semibold text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <WhyUs />
        <Team />
        <Testimonials />
        <Contact />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
