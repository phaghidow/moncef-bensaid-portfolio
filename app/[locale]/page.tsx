import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Education } from "@/components/sections/education";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Stack } from "@/components/sections/stack";

export default async function LocalePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stack />
      <Projects />
      <Experience />
      <Education />
      <About />
      <Contact />
      <Footer />
    </>
  );
}