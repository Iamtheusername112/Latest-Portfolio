import Header from "@/components/header";
import DynamicHero from "@/components/dynamic-hero";
import DynamicAbout from "@/components/dynamic-about";
import Projects from "@/components/projects";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <DynamicHero />
        <DynamicAbout />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
