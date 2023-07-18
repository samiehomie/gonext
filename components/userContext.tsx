'use client'
import { createContext, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { getSession } from '@/authActions'
import type { userSession } from '@/types'
// TODO: #8 Use next-auth instead of cookies-next

export type startStateType = [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
]

export type usertStateType = [
  userSession | null,
  React.Dispatch<React.SetStateAction<userSession | null>>,
]
export const startModalContext = createContext<startStateType | null>(null)
export const userDataContext = createContext<usertStateType | null>(null)
export function StartModalProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [onStart, setOnStart] = useState(false)
  const [user, setUser] = useState<userSession | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    async function session() {
      const session = await getSession()
      if (session.userjwt && session.username) {
        setUser(session)
      } else {
        setUser(null)
      }
    }
    session()
  }, [pathname])

  return (
    <startModalContext.Provider value={[onStart, setOnStart]}>
      <userDataContext.Provider value={[user, setUser]}>
        {children}
      </userDataContext.Provider>
    </startModalContext.Provider>
  )
}
