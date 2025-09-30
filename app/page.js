import ModernHeader from '@/components/modern-header'
import ModernHero from '@/components/modern-hero'
import ModernAbout from '@/components/modern-about'
import ModernProjects from '@/components/modern-projects'
import ModernContact from '@/components/modern-contact'
import ModernFooter from '@/components/modern-footer'

export default function Home() {
  return (
    <div className='min-h-screen bg-white'>
      <ModernHeader />
      <main>
        <section id='home'>
          <ModernHero />
        </section>
        <section id='about'>
          <ModernAbout />
        </section>
        <section id='projects'>
          <ModernProjects />
        </section>
        <section id='contact'>
          <ModernContact />
        </section>
      </main>
      <ModernFooter />
    </div>
  )
}
