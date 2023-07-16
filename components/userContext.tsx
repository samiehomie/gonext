'use client'
import { getCookie } from 'cookies-next'
import Jwt from 'jsonwebtoken'
import { createContext, useState, useEffect } from 'react'

// TODO: #8 Use next-auth instead of cookies-next

export type startStateType = [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
]

export type usertStateType = [
  number | null,
  React.Dispatch<React.SetStateAction<number | null>>,
]
export const startModalContext = createContext<startStateType | null>(null)
export const userDataContext = createContext<usertStateType | null>(null)
export function StartModalProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [onStart, setOnStart] = useState(false)
  const [user, setUser] = useState<number | null>(null)
  useEffect(() => {
    const userToken = getCookie('userjwt')
    const { id } = Jwt.decode(userToken as string) as any
    setUser(id)
  }, [])
  return (
    <startModalContext.Provider value={[onStart, setOnStart]}>
      <userDataContext.Provider value={[user, setUser]}>
        {children}
      </userDataContext.Provider>
    </startModalContext.Provider>
  )
}
