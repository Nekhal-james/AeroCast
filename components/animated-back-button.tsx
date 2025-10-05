"use client"

import { ArrowLeft } from "lucide-react"

interface AnimatedBackButtonProps {
  onClick: () => void
}

export function AnimatedBackButton({ onClick }: AnimatedBackButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-white text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold group"
      type="button"
    >
      <div className="bg-green-400 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
        <ArrowLeft className="w-6 h-6 text-black" />
      </div>
      <p className="translate-x-2">Go Back</p>
    </button>
  )
}
