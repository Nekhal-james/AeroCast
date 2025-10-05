"use client"

interface AnimatedActionButtonProps {
  text: string
  onClick: () => void
  disabled?: boolean
}

export function AnimatedActionButton({ text, onClick, disabled = false }: AnimatedActionButtonProps) {
  const letters = text.split("")

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="group font-semibold text-[#3653f8] rounded-2xl cursor-pointer w-auto px-6 h-[42.66px] border-2 border-[#3653f8] bg-white flex justify-center items-center hover:bg-[#3653f8] hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span className="flex overflow-hidden relative">
        {letters.map((letter, index) => (
          <span
            key={`top-${index}`}
            className="transition-transform duration-200 group-hover:translate-y-[1.2em]"
            style={{ transitionDelay: `${index * 0.05}s` }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </span>
      <span className="flex absolute overflow-hidden">
        {letters.map((letter, index) => (
          <span
            key={`bottom-${index}`}
            className="transition-transform duration-200 -translate-y-[1.2em] group-hover:translate-y-0"
            style={{ transitionDelay: `${index * 0.05}s` }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </span>
    </button>
  )
}
