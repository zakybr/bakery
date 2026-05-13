import { EditorialNewThisWeek } from "@/components/EditorialNewThisWeek";
import { EditorialWhatWeBake } from "@/components/EditorialWhatWeBake";
import { EditorialWhyBakeTown } from "@/components/EditorialWhyBakeTown";
import { FindUs } from "@/components/FindUs";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <EditorialWhatWeBake />
        <EditorialNewThisWeek />
        <EditorialWhyBakeTown />
        <Testimonials />
        <FindUs />
      </main>
      <Footer />
    </>
  );
}
