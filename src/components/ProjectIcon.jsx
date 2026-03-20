export default function ProjectIcon({
  project,
  className = 'h-12 w-12',
  imageClassName = 'h-full w-full',
}) {
  const shellClassName = `flex shrink-0 items-center justify-center rounded-2xl border border-[#c9beb8] bg-[#f3ece7] text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-[#2d2627] shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] ${className}`.trim()

  if (project.iconSrc) {
    return (
      <div className={shellClassName}>
        <img
          src={project.iconSrc}
          alt={`${project.name} icon`}
          className={`${imageClassName} object-contain`.trim()}
        />
      </div>
    )
  }

  return <div className={shellClassName}>{project.iconLabel}</div>
}
