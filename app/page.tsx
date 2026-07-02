import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FavoriteDishes } from "@/components/FavoriteDishes";
import { Signatures } from "@/components/Signatures";
import { MenuTabs } from "@/components/MenuTabs";
import { Philosophy } from "@/components/Philosophy";
import { Spaces } from "@/components/Spaces";
import { Reservation } from "@/components/Reservation";
import { About } from "@/components/About";
import { Testimonials } from "@/components/Testimonials";
import { Gallery } from "@/components/Gallery";
import { Instagram } from "@/components/Instagram";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FavoriteDishes />
        <Signatures />
        <MenuTabs />
        <Philosophy />
        <Spaces />
        <Reservation />
        <About />
        <Testimonials />
        <Gallery />
        <Instagram />
      </main>
      <Footer />
    </>
  );
}
