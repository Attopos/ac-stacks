import { useEffect, useState } from 'react'
import { projects } from './data/projects'
import ProjectCard from './components/ProjectCard'
import ProjectDetailPage from './components/ProjectDetailPage'
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

function StackChip({ label, isActive, onClick, inverted = false }) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation()
        onClick()
      }}
      className={`inline-flex items-center justify-center rounded-xl border transition ${
        inverted
          ? 'h-12 w-12 border-[#8a7f85] bg-[#817981] hover:border-[#9a8f95] hover:bg-[#8b838b]'
          : 'h-12 w-12 border-[#8a7f85] bg-[#817981] hover:border-[#9a8f95] hover:bg-[#8b838b]'
      }`}
      aria-label={label}
      title={label}
      aria-pressed={isActive}
    >
      <StackIcon label={label} className="h-6 w-6" chrome={false} />
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
      <div className="min-h-screen bg-[#2d2b33] text-[#ece6e1]">
        <ProjectDetailPage
          project={activeProject}
          onBack={handleBackToProjects}
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
