"use client"

interface AnimatedButtonProps {
  onClick: () => void
  text: string
  disabled?: boolean
}

export function AnimatedButton({ onClick, text, disabled = false }: AnimatedButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="button button-item relative inline-flex h-14 items-center rounded-full px-8 font-segoe text-xl font-semibold text-[#fafaf6] tracking-tight disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span className="button-bg">
        <span className="button-bg-layers">
          <span className="button-bg-layer button-bg-layer-1 -purple"></span>
          <span className="button-bg-layer button-bg-layer-2 -turquoise"></span>
          <span className="button-bg-layer button-bg-layer-3 -yellow"></span>
        </span>
      </span>
      <span className="button-inner">
        <span className="button-inner-static">{text}</span>
        <span className="button-inner-hover">{text}</span>
      </span>
    </button>
  )
}
