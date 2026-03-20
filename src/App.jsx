import { useEffect, useState } from 'react'
import { projects } from './data/projects'
import ProjectCard from './components/ProjectCard'
import ProjectDetailPage from './components/ProjectDetailPage'

function Header() {
  return (
    <header className="mb-12 border-b border-[#d81927]/25 pb-8">
      <div className="max-w-3xl">
        <h1 className="font-cinzel text-4xl font-semibold tracking-calm text-[#f5f5f5] sm:text-5xl">
          Project Stacks
        </h1>
      </div>
    </header>
  )
}

function StackChip({ label, isActive, onClick, inverted = false }) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation()
        onClick()
      }}
      className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium tracking-[0.04em] transition ${
        inverted
          ? 'border-[#2f2f2f] bg-[#111111] text-[#d0d0d0] hover:border-[#4b4b4b] hover:bg-[#181818]'
          : 'border-[#3a3a3a] bg-[#1a1a1a] text-[#e5e5e5] hover:border-[#575757] hover:bg-[#232323]'
      }`}
      aria-pressed={isActive}
    >
      <span className="h-2.5 w-2.5 rounded-sm bg-[#a0a0a0]" />
      <span>{label}</span>
    </button>
  )
}

function getProjectIdFromPath(pathname) {
  const match = pathname.match(/^\/projects\/([^/]+)$/)
  return match ? decodeURIComponent(match[1]) : null
}

export default function App() {
  const [selectedStack, setSelectedStack] = useState({
    projectId: projects[0].id,
    stack: projects[0].stacks[0],
  })
  const [pathname, setPathname] = useState(window.location.pathname)

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const handleSelectStack = (projectId, stack) => {
    setSelectedStack({ projectId, stack })
  }

  const handleOpenProject = (project) => {
    const nextPath = `/projects/${project.id}`
    window.history.pushState({}, '', nextPath)
    setPathname(nextPath)
  }

  const handleBackToProjects = () => {
    window.history.pushState({}, '', '/')
    setPathname('/')
  }

  const activeProjectId = getProjectIdFromPath(pathname)
  const activeProject = activeProjectId
    ? projects.find((project) => project.id === activeProjectId) ?? null
    : null

  if (activeProjectId) {
    return (
      <div className="min-h-screen bg-[#121212] text-[#f5f5f5]">
        <ProjectDetailPage
          project={activeProject}
          onBack={handleBackToProjects}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#121212] text-[#f5f5f5]">
      <div className="mx-auto max-w-5xl px-6 pb-16 pt-10 sm:px-8 sm:pt-14 lg:px-12 lg:pt-20">
        <Header />

        <main className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              selected={selectedStack}
              onSelect={handleSelectStack}
              onOpenDetail={handleOpenProject}
              StackChip={StackChip}
            />
          ))}
        </main>
      </div>
    </div>
  )
}
