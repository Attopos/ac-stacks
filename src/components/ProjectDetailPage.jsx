import { ArrowLeft } from 'lucide-react'

function ProjectIconPlaceholder({ label }) {
  return (
    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#d6d6d6] bg-white text-sm font-semibold uppercase tracking-[0.08em] text-[#111111] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
      {label}
    </div>
  )
}

function StackIconPlaceholder({ label }) {
  return (
    <div
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#2f2f2f] bg-[#161616] text-[10px] font-semibold uppercase tracking-[0.06em] text-[#d0d0d0]"
      title={label}
      aria-label={label}
    >
      {label.slice(0, 2)}
    </div>
  )
}

export default function ProjectDetailPage({ project, onBack }) {
  if (!project) {
    return (
      <div className="mx-auto max-w-5xl px-6 pb-16 pt-10 sm:px-8 sm:pt-14 lg:px-12 lg:pt-20">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full border border-[#2c2c2c] bg-[#171717] px-4 py-2 text-sm text-[#d8d8d8] transition hover:border-[#444444] hover:bg-[#1f1f1f]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <div className="mt-10 rounded-[28px] border border-[#2a2a2a] bg-[#111111] p-8 text-[#f5f5f5]">
          <h2 className="font-cinzel text-3xl font-semibold tracking-calm">
            Project not found
          </h2>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-6 pb-16 pt-10 sm:px-8 sm:pt-14 lg:px-12 lg:pt-20">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 rounded-full border border-[#2c2c2c] bg-[#171717] px-4 py-2 text-sm text-[#d8d8d8] transition hover:border-[#444444] hover:bg-[#1f1f1f]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to projects
      </button>

      <section className="mt-8 rounded-[30px] border border-[#2e2e2e] bg-[#111111] p-7 shadow-[0_28px_90px_rgba(0,0,0,0.32)] sm:p-8">
        <div className="flex flex-col gap-5 border-b border-[#242424] pb-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <ProjectIconPlaceholder label={project.iconLabel} />
            <div className="min-w-0">
              <h1 className="font-cinzel text-3xl font-semibold tracking-calm text-[#f5f5f5] sm:text-4xl">
                {project.name}
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.stacks.map((stack) => (
              <StackIconPlaceholder key={stack} label={stack} />
            ))}
          </div>
        </div>

        <section className="mt-6">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#b0b0b0]">
              Dev Log
            </p>
            <span className="text-[11px] uppercase tracking-[0.24em] text-[#8d8d8d]">
              Notes & history
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {project.devLog.map((entry) => (
              <div
                key={entry}
                className="rounded-2xl border border-[#2c2c2c] bg-[#1a1a1a] px-4 py-4 text-sm leading-7 text-[#e8e8e8]"
              >
                {entry}
              </div>
            ))}
          </div>
        </section>
      </section>
    </div>
  )
}
