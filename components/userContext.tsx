'use client'
import { getCookie } from 'cookies-next'
import Jwt from 'jsonwebtoken'
import { createContext, useState, useEffect } from 'react'

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
      {children}
    </startModalContext.Provider>
  )
}
