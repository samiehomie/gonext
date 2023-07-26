'use client'
import type { userSession } from '@/types'
import { useTransition, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function useSession() {
  const [user, setUser] = useState<userSession | null>(null)
  const [isPending, startTransition] = useTransition()
  const pathName = usePathname()
  useEffect(() => {
    const getuser = async () => {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_FRONT_URL}/api/auth/github/session`,
      ).then((res) => res.json())
      startTransition(() => {
        setUser(data as userSession)
      })
    }
    getuser()
  }, [pathName])

  return { loading: isPending, user: user, setUser: setUser }
}
