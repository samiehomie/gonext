'use client'
import { createContext, useState } from 'react'

// TODO: #8 Use next-auth instead of cookies-next

export type startStateType = [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
]

export const startModalContext = createContext<startStateType | null>(null)
export function StartModalProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [onStart, setOnStart] = useState(false)

  return (
    <startModalContext.Provider value={[onStart, setOnStart]}>
      <div className={`relative overflow-hidden`}>{children}</div>
    </startModalContext.Provider>
  )
}
