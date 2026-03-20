import { stackIcons } from '../data/stackIcons'

function StackIconFallback({ label, className = '', chrome = true }) {
  return (
    <div
      className={`flex items-center justify-center text-[10px] font-semibold uppercase tracking-[0.06em] ${
        chrome
          ? 'rounded-xl border border-[#8a7f85] bg-[#817981] text-[#f2eae4]'
          : 'text-[#eee5df]'
      } ${className}`.trim()}
      title={label}
      aria-label={label}
    >
      {label.slice(0, 2)}
    </div>
  )
}

export default function StackIcon({
  label,
  className = 'h-10 w-10',
  chrome = true,
}) {
  const icon = stackIcons[label]

  if (!icon) {
    return <StackIconFallback label={label} className={className} chrome={chrome} />
  }

  return (
    <div
      className={`flex items-center justify-center ${
        chrome
          ? 'rounded-xl border border-[#8a7f85] bg-[#817981] text-white'
          : 'text-white'
      } ${className}`.trim()}
      title={icon.title}
      aria-label={icon.title}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-5 w-5"
        fill={`#${icon.hex}`}
      >
        <path d={icon.path} />
      </svg>
    </div>
  )
}
