'use client'
import { createContext, useState } from 'react'

// TODO: #8 Use next-auth instead of cookies-next

export type stateType = {
  start: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  search: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

export const startModalContext = createContext<stateType | null>(null)

export function StartModalProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [onStart, setOnStart] = useState(false)
  const [onSearch, setOnSearch] = useState(false)

  return (
    <startModalContext.Provider
      value={{
        start: [onStart, setOnStart],
        search: [onSearch, setOnSearch]
      }}
    >
      <div className={`relative overflow-hidden`}>{children}</div>
    </startModalContext.Provider>
  )
}
