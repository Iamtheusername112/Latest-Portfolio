import Header from '@/components/header'
import DynamicHero from '@/components/dynamic-hero'
import DynamicAbout from '@/components/dynamic-about'
import Contact from '@/components/contact'
import DynamicFooter from '@/components/dynamic-footer'

export default function Home() {
  return (
    <div className='min-h-screen'>
      <Header />
      <main>
        <DynamicHero />
        <DynamicAbout />
        <Contact />
      </main>
      <DynamicFooter />
    </div>
  )
}
