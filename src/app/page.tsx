import { About } from "@/components/About";
import { Awards } from "@/components/Awards";
import { Featured } from "@/components/Featured";
import { FindUs } from "@/components/FindUs";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Menu } from "@/components/Menu";
import { Navbar } from "@/components/Navbar";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Menu />
        <Featured />
        <Awards />
        <Testimonials />
        <FindUs />
      </main>
      <Footer />
    </>
  );
}
