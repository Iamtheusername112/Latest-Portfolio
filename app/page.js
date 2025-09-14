import Header from "@/components/header";
import DynamicHero from "@/components/dynamic-hero";
import DynamicAbout from "@/components/dynamic-about";
import DynamicProjects from "@/components/dynamic-projects";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <DynamicHero />
        <DynamicAbout />
        <DynamicProjects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
