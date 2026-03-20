import { useEffect, useState } from 'react'
import { projects, stackNotes } from './data/projects'
import ProjectCard from './components/ProjectCard'
import ProjectDetailPage from './components/ProjectDetailPage'
import StackDetailPage from './components/StackDetailPage'
import StackIcon from './components/StackIcon'

function Header() {
  return (
    <header className="mb-12 border-b border-[#6a4247]/48 pb-8">
      <div className="max-w-3xl">
        <h1 className="font-cinzel text-5xl font-semibold tracking-calm text-[#f0e8e2] sm:text-6xl">
          Project Stacks
        </h1>
      </div>
    </header>
  )
}

function StackChip({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation()
        onClick()
      }}
      className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#8a7f85] bg-[#817981] transition hover:border-[#9a8f95] hover:bg-[#8b838b]"
      aria-label={label}
      title={label}
    >
      <StackIcon label={label} className="h-6 w-6" chrome={false} />
    </button>
  )
}

function getRoute(pathname) {
  const projectMatch = pathname.match(/^\/projects\/([^/]+)$/)
  if (projectMatch) {
    return {
      type: 'project',
      slug: decodeURIComponent(projectMatch[1]),
    }
  }

  const stackMatch = pathname.match(/^\/stacks\/([^/]+)$/)
  if (stackMatch) {
    return {
      type: 'stack',
      slug: decodeURIComponent(stackMatch[1]),
    }
  }

  return {
    type: 'home',
    slug: null,
  }
}

export default function App() {
  const [pathname, setPathname] = useState(window.location.pathname)

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigateTo = (nextPath) => {
    window.history.pushState({}, '', nextPath)
    setPathname(nextPath)
  }

  const handleOpenProject = (project) => {
    navigateTo(`/projects/${project.id}`)
  }

  const handleOpenStack = (stack) => {
    navigateTo(`/stacks/${encodeURIComponent(stack)}`)
  }

  const handleBackToProjects = () => {
    navigateTo('/')
  }

  const route = getRoute(pathname)

  if (route.type === 'project') {
    const activeProject =
      projects.find((project) => project.id === route.slug) ?? null

    return (
      <div className="min-h-screen bg-[#2d2b33] text-[#ece6e1]">
        <ProjectDetailPage
          project={activeProject}
          onBack={handleBackToProjects}
          onOpenStack={handleOpenStack}
        />
      </div>
    )
  }

  if (route.type === 'stack') {
    const relatedProjects = projects.filter((project) =>
      project.stacks.includes(route.slug),
    )
    const stackExists = Boolean(stackNotes[route.slug]) || relatedProjects.length > 0

    return (
      <div className="min-h-screen bg-[#2d2b33] text-[#ece6e1]">
        <StackDetailPage
          stack={stackExists ? route.slug : null}
          summary={stackExists ? stackNotes[route.slug] : null}
          relatedProjects={relatedProjects}
          onBack={handleBackToProjects}
          onOpenProject={handleOpenProject}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#2d2b33] text-[#ece6e1]">
      <div className="mx-auto max-w-5xl px-6 pb-16 pt-10 sm:px-8 sm:pt-14 lg:px-12 lg:pt-20">
        <Header />

        <main className="grid items-stretch gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenStack={handleOpenStack}
              onOpenDetail={handleOpenProject}
              StackChip={StackChip}
            />
          ))}
        </main>
      </div>
    </div>
  )
}
