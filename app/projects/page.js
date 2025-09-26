import Header from '@/components/header'
import Projects from '@/components/projects'
import DynamicFooter from '@/components/dynamic-footer'

export const metadata = {
  title: 'Projects - Francis Iwu',
  description:
    'Explore my portfolio of web development projects, applications, and technical solutions.',
  keywords:
    'projects, portfolio, web development, applications, React, Next.js, JavaScript',
}

export default function ProjectsPage() {
  return (
    <div className='min-h-screen'>
      <Header />
      <main>
        <Projects />
      </main>
      <DynamicFooter />
    </div>
  )
}
