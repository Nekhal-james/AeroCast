"use client"

import type React from "react"

export function Loader() {
  return (
    <div className="flex flex-wrap w-[156px] h-[156px]">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div
          key={i}
          className="flex-[0_0_52px] m-[1px] bg-transparent rounded box-border animate-ripple"
          style={
            {
              animationDelay: `${i * 100}ms`,
              "--cell-color": getCellColor(i),
            } as React.CSSProperties
          }
        />
      ))}
      <style jsx>{`
        @keyframes ripple {
          0% {
            background-color: transparent;
          }
          30% {
            background-color: var(--cell-color);
          }
          60% {
            background-color: transparent;
          }
          100% {
            background-color: transparent;
          }
        }
        .animate-ripple {
          animation: 1.5s ripple ease infinite;
        }
      `}</style>
    </div>
  )
}

function getCellColor(index: number): string {
  const colors = ["#E45A92", "#E85A9A", "#EC5BA2", "#F05CAA", "#F45DB2", "#F85EBA", "#FC5FC2", "#FF60CA", "#FFACAC"]
  return colors[index]
}
