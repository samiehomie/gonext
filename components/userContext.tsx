'use client'
import { createContext, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import type { userSession } from '@/types'
import { garbageCookiesDelete } from '@/actions'
// TODO: #8 Use next-auth instead of cookies-next

export type startStateType = {
  start: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  user: [
    userSession | null,
    React.Dispatch<React.SetStateAction<userSession | null>>,
  ]
}

export const startModalContext = createContext<startStateType | null>(null)
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
      await garbageCookiesDelete()
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FRONT_URL}/api/auth/github/session`,
        {
          headers: { Accept: 'application / json' },
        },
      )
      const userData: userSession = await response.json()

      if (userData && userData.jwt) {
        setUser(userData)
      } else {
        setUser(null)
      }
    }
    session()
  }, [pathname])

  return (
    <startModalContext.Provider
      value={{ start: [onStart, setOnStart], user: [user, setUser] }}
    >
      <div className={`relative overflow-hidden`}>{children}</div>
    </startModalContext.Provider>
  )
}
